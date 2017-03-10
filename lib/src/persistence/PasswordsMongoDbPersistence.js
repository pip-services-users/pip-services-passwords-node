"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsMongoDbPersistence = (function (_super) {
    __extends(PasswordsMongoDbPersistence, _super);
    function PasswordsMongoDbPersistence() {
        _super.call(this, PasswordsMongoDbPersistence.Descriptor, require('./UserPasswordModel'));
    }
    PasswordsMongoDbPersistence.prototype.getUserPasswordById = function (correlationId, userId, callback) {
        this.getById(userId, callback);
    };
    PasswordsMongoDbPersistence.prototype.createUserPassword = function (correlationId, userPassword, callback) {
        var item = _.omit(userPassword, 'lock_until', 'pwd_fail_count', 'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire');
        item._id = userPassword.id;
        item.lock = false;
        this.create(item, callback);
    };
    PasswordsMongoDbPersistence.prototype.updateUserPassword = function (correlationId, userId, userPassword, callback) {
        userPassword = _.omit(userPassword, '_id');
        this.update(userId, userPassword, callback);
    };
    PasswordsMongoDbPersistence.prototype.deleteUserPassword = function (correlationId, userId, callback) {
        this.delete(userId, callback);
    };
    /**
     * Unique descriptor for the PasswordsMongoDbPersistence component
     */
    PasswordsMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-passwords", "mongodb", "*");
    return PasswordsMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.PasswordsMongoDbPersistence = PasswordsMongoDbPersistence;
