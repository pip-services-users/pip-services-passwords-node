"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var PasswordsSenecaPlugin_1 = require('../../src/run/PasswordsSenecaPlugin');
var buildConfig = {
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
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('PasswordsSenecaPlugin', function () {
    var seneca;
    var plugin = new PasswordsSenecaPlugin_1.PasswordsSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'passwords',
            cmd: 'authenticate',
            user_id: '1',
            password: 'abc'
        }, function (err, userPassword) {
            assert.isNotNull(err);
            done();
        });
    });
});
