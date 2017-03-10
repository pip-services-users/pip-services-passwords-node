let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { PasswordsMemoryPersistence } from '../../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../../src/logic/PasswordsController';
import { PasswordsSenecaService } from '../../../src/services/version1/PasswordsSenecaService';

let USER_PWD = {
    id: '1',
    name: 'Test User 1',
    email: 'user1@digitallivingsoftware.com',
    password: 'password123'
};

suite('PasswordsSenecaService', ()=> {        
    let db = new PasswordsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new PasswordsController();
    ctrl.configure(new ComponentConfig());

    let service = new PasswordsSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'passwords',
                        cmd: 'set_password',
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);
                        assert.isNotNull(userPassword.password);
                        assert.isFalse(userPassword.lock);

                        callback();
                    }
                );
            },
        // Authenticate user
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'passwords',
                        cmd: 'authenticate',
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);

                        callback();
                    }
                );
            },
        // Change password
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'passwords',
                        cmd: 'change_password',
                        user_id: USER_PWD.id,
                        old_password: USER_PWD.password,
                        new_password: 'newpwd123'
                    },
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id)

                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'passwords',
                        cmd: 'delete_password',
                        user_id: USER_PWD.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to authenticate
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'passwords',
                        cmd: 'authenticate',
                        user_id: USER_PWD.id,
                        password: 'newpwd123'
                    },
                    (err, userPassword) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});