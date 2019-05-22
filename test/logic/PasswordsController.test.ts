let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { MessageDistributionNullClientV1 } from 'pip-clients-msgdistribution-node';

import { UserPasswordV1 } from '../../src/data/version1/UserPasswordV1';
import { PasswordsMemoryPersistence } from '../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../src/logic/PasswordsController';

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsController', ()=> {    
    let persistence: PasswordsMemoryPersistence;
    let controller: PasswordsController;

    suiteSetup(() => {
        persistence = new PasswordsMemoryPersistence();
        controller = new PasswordsController();
        controller.configure(new ConfigParams());

        let logger = new ConsoleLogger();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1()
        );

        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Recover Password', (done) => {
        let userPassword1: UserPasswordV1;

        async.series([
        // Create a new user
            (callback) => {
                controller.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
            // Verify
            (callback) => {
                persistence.getOneById(
                    null,
                    USER_PWD.id,
                    (err, userPassword) => {
                        assert.isNull(err);

                        assert.equal(USER_PWD.id, userPassword.id);
                        assert.isNull(userPassword.rec_code || null);

                        callback();
                    }
                )
            },
        // Recover password
            (callback) => {
                controller.recoverPassword(
                    null,
                    USER_PWD.id,
                    (err,) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Verify
            (callback) => {
                persistence.getOneById(
                    null,
                    USER_PWD.id,
                    (err, userPassword) => {
                        assert.isNull(err);

                        assert.equal(USER_PWD.id, userPassword.id);
                        assert.isNotNull(userPassword.rec_code);
                        assert.isNotNull(userPassword.rec_expire_time);

                        userPassword1 = userPassword;

                        callback();
                    }
                ),
                // Validate code
                (callback) => {
                    controller.validateCode(
                        null, USER_PWD.id, userPassword1.rec_code,
                        (err, valid) => {
                            assert.isNull(err);

                            assert.isTrue(valid);

                            callback();
                        }
                    )
                }
            }
        ], done);
    });

    test('Change Password', (done) => {
        async.series([
        // Sign up
            (callback) => {
                controller.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Change password
            (callback) => {
                controller.changePassword(
                    null,
                    USER_PWD.id,
                    USER_PWD.password,
                    'xxx123',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Sign in with new password
            (callback) => {
                controller.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx123',
                    (err, authenticated) => {
                        assert.isNull(err);
                        
                        assert.isTrue(authenticated);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Fail to Signin with Wrong Password', (done) => {
        async.series([
        // Sign up
            (callback) => {
                controller.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Sign in with wrong password
            (callback) => {
                controller.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx',
                    (err, authenticated) => {
                        assert.isNotNull(err);
                        assert.isFalse(authenticated);
                        callback();
                    }
                );
            }
        ], done);
    });

    test('Set Temp Password', (done) => {
        let userPassword1: UserPasswordV1;

        async.series([
        // Create a new user
            (callback) => {
                controller.setTempPassword(
                    null,
                    USER_PWD.id, 
                    (err, password) => {
                        assert.isNull(err);
                        
                        assert.isNotNull(password);

                        callback();
                    }
                );
            },
            // Verify
            (callback) => {
                controller.getPasswordInfo(
                    null,
                    USER_PWD.id,
                    (err, info) => {
                        assert.isNull(err);

                        assert.equal(USER_PWD.id, info.id);
                        assert.isNotNull(info.change_time);

                        callback();
                    }
                )
            }
        ], done);
    });

});