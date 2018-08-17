let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { UserPasswordV1 } from '../../../src/data/version1/UserPasswordV1';
import { PasswordsMemoryPersistence } from '../../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../../src/logic/PasswordsController';
import { PasswordsSenecaServiceV1 } from '../../../src/services/version1/PasswordsSenecaServiceV1';

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: PasswordsSenecaServiceV1;
    let persistence: PasswordsMemoryPersistence;
    let controller: PasswordsController;

    suiteSetup((done) => {
        persistence = new PasswordsMemoryPersistence();
        controller = new PasswordsController();

        service = new PasswordsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-passwords', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                seneca.act(
                    {
                        role: 'passwords',
                        cmd: 'set_password',
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Authenticate user
            (callback) => {
                seneca.act(
                    {
                        role: 'passwords',
                        cmd: 'authenticate',
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, result) => {
                        assert.isNull(err);
                        
                        assert.isObject(result);
                        assert.isTrue(result.authenticated);

                        callback();
                    }
                );
            },
        // Change password
            (callback) => {
                seneca.act(
                    {
                        role: 'passwords',
                        cmd: 'change_password',
                        user_id: USER_PWD.id,
                        old_password: USER_PWD.password,
                        new_password: 'newpwd123'
                    },
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                seneca.act(
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
                seneca.act(
                    {
                        role: 'passwords',
                        cmd: 'authenticate',
                        user_id: USER_PWD.id,
                        password: 'newpwd123'
                    },
                    (err, result) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});