"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var PasswordsFilePersistence_1 = require('../../src/persistence/PasswordsFilePersistence');
var PasswordsPersistenceFixture_1 = require('./PasswordsPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/passwords.test.json',
        data: []
    }
});
suite('PasswordsFilePersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new PasswordsFilePersistence_1.PasswordsFilePersistence();
        db.configure(config);
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
