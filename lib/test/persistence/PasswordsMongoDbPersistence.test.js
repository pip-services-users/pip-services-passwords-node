"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsMongoDbPersistence_1 = require('../../src/persistence/PasswordsMongoDbPersistence');
var PasswordsPersistenceFixture_1 = require('./PasswordsPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('PasswordsMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new PasswordsPersistenceFixture_1.PasswordsPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Basic Operations', function (done) {
        fixture.testBasicOperations(done);
    });
});
