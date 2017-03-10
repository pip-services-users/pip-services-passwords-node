"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsMemoryPersistence_1 = require('../../src/persistence/PasswordsMemoryPersistence');
var PasswordsController_1 = require('../../src/logic/PasswordsController');
var USER_PWD = {
    id: '1',
    password: 'password123'
};
suite('PasswordsController', function () {
    var db = new PasswordsMemoryPersistence_1.PasswordsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new PasswordsController_1.PasswordsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Recover Password', function (done) {
        async.series([
            // Create a new user
            function (callback) {
                ctrl.setPassword(null, USER_PWD.id, USER_PWD.password, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    callback();
                });
            },
            // Recover password
            function (callback) {
                ctrl.recoverPassword(null, USER_PWD.id, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    //assert.isDefined(userPassword.pwd_rec_code);
                    callback();
                });
            }
        ], done);
    });
    test('Change Password', function (done) {
        async.series([
            // Sign up
            function (callback) {
                ctrl.setPassword(null, USER_PWD.id, USER_PWD.password, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    callback();
                });
            },
            // Change password
            function (callback) {
                ctrl.changePassword(null, USER_PWD.id, USER_PWD.password, 'xxx123', function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    callback();
                });
            },
            // Sign in with new password
            function (callback) {
                ctrl.authenticate(null, USER_PWD.id, 'xxx123', function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    callback();
                });
            }
        ], done);
    });
    test('Fail to Signin with Wrong Password', function (done) {
        async.series([
            // Sign up
            function (callback) {
                ctrl.setPassword(null, USER_PWD.id, USER_PWD.password, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    callback();
                });
            },
            // Sign in with wrong password
            function (callback) {
                ctrl.authenticate(null, USER_PWD.id, 'xxx', function (err, user) {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], done);
    });
});
