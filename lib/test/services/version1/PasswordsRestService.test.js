"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsMemoryPersistence_1 = require('../../../src/persistence/PasswordsMemoryPersistence');
var PasswordsController_1 = require('../../../src/logic/PasswordsController');
var PasswordsRestService_1 = require('../../../src/services/version1/PasswordsRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var USER_PWD = {
    id: '1',
    password: 'password123'
};
suite('PasswordsRestService', function () {
    var db = new PasswordsMemoryPersistence_1.PasswordsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new PasswordsController_1.PasswordsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new PasswordsRestService_1.PasswordsRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Basic Operations', function (done) {
        async.series([
            // Create password
            function (callback) {
                rest.post('/passwords', {
                    user_id: USER_PWD.id,
                    password: USER_PWD.password
                }, function (err, req, res, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    assert.isNotNull(userPassword.password);
                    assert.isFalse(userPassword.lock);
                    callback();
                });
            },
            // Authenticate user
            function (callback) {
                rest.post('/passwords/' + USER_PWD.id + '/authenticate', {
                    password: USER_PWD.password
                }, function (err, req, res, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    assert.isNotNull(userPassword.password);
                    assert.isFalse(userPassword.lock);
                    callback();
                });
            },
            // ChangePassword
            function (callback) {
                rest.post('/passwords/change', {
                    user_id: USER_PWD.id,
                    old_password: USER_PWD.password,
                    new_password: 'newpwd123'
                }, function (err, req, res, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    assert.isNotNull(userPassword.password);
                    assert.isFalse(userPassword.lock);
                    callback();
                });
            },
            // Delete password
            function (callback) {
                rest.del('/passwords/' + USER_PWD.id, function (err, req, res) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Authenticate user again
            function (callback) {
                rest.post('/passwords/authenticate', {
                    user_id: USER_PWD.id,
                    password: 'newpwd123'
                }, function (err, req, res, userPassword) {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], done);
    });
});
