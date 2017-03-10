let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { PasswordsMemoryPersistence } from '../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../src/logic/PasswordsController';

let USER_PWD = {
    id: '1',
    password: 'password123'
};

suite('PasswordsController', ()=> {    
    let db = new PasswordsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new PasswordsController();
    ctrl.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Recover Password', (done) => {
        async.series([
        // Create a new user
            (callback) => {
                ctrl.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);

                        callback();
                    }
                );
            },
        // Recover password
            (callback) => {
                ctrl.recoverPassword(
                    null,
                    USER_PWD.id,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        //assert.isDefined(userPassword.pwd_rec_code);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Change Password', (done) => {
        async.series([
        // Sign up
            (callback) => {
                ctrl.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);

                        callback();
                    }
                );
            },
        // Change password
            (callback) => {
                ctrl.changePassword(
                    null,
                    USER_PWD.id,
                    USER_PWD.password,
                    'xxx123',
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);

                        callback();
                    }
                );
            },
        // Sign in with new password
            (callback) => {
                ctrl.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx123',
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);

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
                ctrl.setPassword(
                    null,
                    USER_PWD.id, 
                    USER_PWD.password,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);

                        callback();
                    }
                );
            },
        // Sign in with wrong password
            (callback) => {
                ctrl.authenticate(
                    null,
                    USER_PWD.id,
                    'xxx',
                    (err, user) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});