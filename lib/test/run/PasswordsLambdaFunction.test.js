"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var PasswordsLambdaFunction_1 = require('../../src/run/PasswordsLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});
suite('PasswordsLambdaFunction', function () {
    var lambda = new PasswordsLambdaFunction_1.PasswordsLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            role: 'passwords',
            cmd: 'authenticate',
            user_id: '1',
            password: 'abc'
        }, {
            done: function (err, userPassword) {
                assert.isNotNull(err);
                done();
            }
        });
    });
});
