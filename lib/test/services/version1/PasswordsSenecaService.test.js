"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var PasswordsMemoryPersistence_1 = require('../../../src/persistence/PasswordsMemoryPersistence');
var PasswordsController_1 = require('../../../src/logic/PasswordsController');
var PasswordsSenecaService_1 = require('../../../src/services/version1/PasswordsSenecaService');
var USER_PWD = {
    id: '1',
    name: 'Test User 1',
    email: 'user1@digitallivingsoftware.com',
    password: 'password123'
};
suite('PasswordsSenecaService', function () {
    var db = new PasswordsMemoryPersistence_1.PasswordsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new PasswordsController_1.PasswordsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new PasswordsSenecaService_1.PasswordsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Basic Operations', function (done) {
        async.series([
            // Create password
            function (callback) {
                seneca.getSeneca().act({
                    role: 'passwords',
                    cmd: 'set_password',
                    user_id: USER_PWD.id,
                    password: USER_PWD.password
                }, function (err, userPassword) {
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
                seneca.getSeneca().act({
                    role: 'passwords',
                    cmd: 'authenticate',
                    user_id: USER_PWD.id,
                    password: USER_PWD.password
                }, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    callback();
                });
            },
            // Change password
            function (callback) {
                seneca.getSeneca().act({
                    role: 'passwords',
                    cmd: 'change_password',
                    user_id: USER_PWD.id,
                    old_password: USER_PWD.password,
                    new_password: 'newpwd123'
                }, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    callback();
                });
            },
            // Delete password
            function (callback) {
                seneca.getSeneca().act({
                    role: 'passwords',
                    cmd: 'delete_password',
                    user_id: USER_PWD.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to authenticate
            function (callback) {
                seneca.getSeneca().act({
                    role: 'passwords',
                    cmd: 'authenticate',
                    user_id: USER_PWD.id,
                    password: 'newpwd123'
                }, function (err, userPassword) {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], done);
    });
});
