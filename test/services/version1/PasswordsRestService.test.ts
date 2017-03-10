let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { PasswordsMemoryPersistence } from '../../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../../src/logic/PasswordsController';
import { PasswordsRestService } from '../../../src/services/version1/PasswordsRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let USER_PWD = {
    id: '1',
    password: 'password123'
};

suite('PasswordsRestService', ()=> {    
    let db = new PasswordsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new PasswordsController();
    ctrl.configure(new ComponentConfig());

    let service = new PasswordsRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                rest.post('/passwords',
                    {
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, req,res, userPassword) => {
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
                rest.post('/passwords/' + USER_PWD.id + '/authenticate',
                    {
                        password: USER_PWD.password
                    },
                    (err, req, res, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);
                        assert.isNotNull(userPassword.password);
                        assert.isFalse(userPassword.lock);

                        callback();
                    }
                );
            },
        // ChangePassword
            (callback) => {
                rest.post('/passwords/change',
                    {
                        user_id: USER_PWD.id,
                        old_password: USER_PWD.password,
                        new_password: 'newpwd123' 
                    },
                    (err, req, res, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);
                        assert.isNotNull(userPassword.password);
                        assert.isFalse(userPassword.lock);

                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                rest.del('/passwords/' + USER_PWD.id,
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Authenticate user again
            (callback) => {
                rest.post('/passwords/authenticate',
                    {
                        user_id: USER_PWD.id,
                        password: 'newpwd123'
                    },
                    (err, req, res, userPassword) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});