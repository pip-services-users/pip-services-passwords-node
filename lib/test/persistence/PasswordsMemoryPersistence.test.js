"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var PasswordsMemoryPersistence_1 = require('../../src/persistence/PasswordsMemoryPersistence');
var PasswordsPersistenceFixture_1 = require('./PasswordsPersistenceFixture');
suite('PasswordsMemoryPersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new PasswordsMemoryPersistence_1.PasswordsMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new PasswordsPersistenceFixture_1.PasswordsPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('Basic Operations', function (done) {
        fixture.testBasicOperations(done);
    });
});
