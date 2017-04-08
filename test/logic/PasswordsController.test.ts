let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

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

        let logger = new ConsoleLogger();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Recover Password', (done) => {
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

                        callback();
                    }
                )
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
    
});