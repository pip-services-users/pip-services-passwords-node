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
import { PasswordsGrpcServiceV1 } from '../../../src/services/version1/PasswordsGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let USER_PWD = new UserPasswordV1('1', 'password123');

suite('PasswordsGrpcServiceV1', ()=> {
    let service: PasswordsGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new PasswordsMemoryPersistence();
        let controller = new PasswordsController();

        service = new PasswordsGrpcServiceV1();
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
            __dirname + "../../../../../src/protos/passwords_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).passwords_v1.Passwords;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Basic Operations', (done) => {
        async.series([
        // Create password
            (callback) => {
                client.set_password(
                    {
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, response) => {
                        err = err || response.error;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Authenticate user
            (callback) => {
                client.authenticate(
                    {
                        user_id: USER_PWD.id,
                        password: USER_PWD.password
                    },
                    (err, response) => {
                        err = err || response.error;
                        let authenticated = response ? response.authenticated : null;

                        assert.isNull(err);
                        
                        assert.isTrue(authenticated);

                        callback();
                    }
                );
            },
        // ChangePassword
            (callback) => {
                client.change_password(
                    {
                        user_id: USER_PWD.id,
                        old_password: USER_PWD.password,
                        new_password: 'newpwd123' 
                    },
                    (err, response) => {
                        err = err || response.error;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Delete password
            (callback) => {
                client.delete_password(
                    {
                        user_id: USER_PWD.id
                    },
                    (err, response) => {
                        err = err || response.error;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Authenticate user again
            (callback) => {
                client.authenticate(
                    {
                        user_id: USER_PWD.id,
                        password: 'newpwd123'
                    },
                    (err, response) => {
                        err = err || response.error;

                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

});
