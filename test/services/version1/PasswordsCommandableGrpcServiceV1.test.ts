let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/passwords_v1_grpc_pb');
let messages = require('../../../../src/protos/passwords_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { UserPasswordV1 } from '../../../src/data/version1/UserPasswordV1';
import { PasswordsMemoryPersistence } from '../../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../../../src/logic/PasswordsController';
import { PasswordsCommandableGrpcServiceV1 } from '../../../src/services/version1/PasswordsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsCommandableGrpcServiceV1', ()=> {
    let service: PasswordsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new PasswordsMemoryPersistence();
        let controller = new PasswordsController();

        service = new PasswordsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-passwords', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/passwords.set_password',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: USER_PWD.id,
                            password: USER_PWD.password
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);

                        callback();
                    }
                );
            },
        // Authenticate user
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/passwords.authenticate',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: USER_PWD.id,
                            password: USER_PWD.password
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let result = JSON.parse(response.result_json);
                        
                        assert.isObject(result);
                        assert.isTrue(result.authenticated);

                        callback();
                    }
                );
            },
        // ChangePassword
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/passwords.change_password',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: USER_PWD.id,
                            old_password: USER_PWD.password,
                            new_password: 'newpwd123' 
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);

                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/passwords.delete_password',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: USER_PWD.id
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);

                        callback();
                    }
                );
            },
        // Authenticate user again
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/passwords.authenticate',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: USER_PWD.id,
                            password: 'newpwd123'
                            })
                    },
                    (err, response) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

});
