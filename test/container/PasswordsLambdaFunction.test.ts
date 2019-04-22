let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { UserPasswordV1 } from '../../src/data/version1/UserPasswordV1';
import { PasswordsMemoryPersistence } from '../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../src/logic/PasswordsController';
import { PasswordsLambdaFunction } from '../../src/container/PasswordsLambdaFunction';

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsLambdaFunction', ()=> {
    let lambda: PasswordsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-passwords:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-passwords:controller:default:default:1.0'
        );

        lambda = new PasswordsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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