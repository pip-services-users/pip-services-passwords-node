let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { UserPasswordV1 } from '../../../src/data/version1/UserPasswordV1';
import { PasswordsMemoryPersistence } from '../../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../../src/logic/PasswordsController';
import { PasswordsHttpServiceV1 } from '../../../src/services/version1/PasswordsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsHttpServiceV1', ()=> {
    let service: PasswordsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new PasswordsMemoryPersistence();
        let controller = new PasswordsController();

        service = new PasswordsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-passwords', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                rest.post('/v1/passwords/set_password',
                    {
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Authenticate user
            (callback) => {
                rest.post('/v1/passwords/authenticate',
                    {
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);
                        
                        assert.isObject(result);
                        assert.isTrue(result.authenticated);

                        callback();
                    }
                );
            },
        // ChangePassword
            (callback) => {
                rest.post('/v1/passwords/change_password',
                    {
                        user_id: USER_PWD.id,
                        old_password: USER_PWD.password,
                        new_password: 'newpwd123' 
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                rest.post('/v1/passwords/delete_password',
                    {
                        user_id: USER_PWD.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Authenticate user again
            (callback) => {
                rest.post('/v1/passwords/authenticate',
                    {
                        user_id: USER_PWD.id,
                        password: 'newpwd123'
                    },
                    (err, req, res, result) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});