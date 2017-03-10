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
var PasswordsFilePersistence = (function (_super) {
    __extends(PasswordsFilePersistence, _super);
    function PasswordsFilePersistence(descriptor) {
        _super.call(this, descriptor || PasswordsFilePersistence.Descriptor);
    }
    PasswordsFilePersistence.prototype.validateUserPassword = function (item) {
        return _.pick(item, 'id', 'password', 'lock', 'lock_until', 'pwd_fail_count', 'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire', 'custom_hdr', 'custom_dat');
    };
    PasswordsFilePersistence.prototype.getUserPasswordById = function (correlationId, userId, callback) {
        this.getById(userId, function (err, item) {
            if (err)
                callback(err);
            else {
                callback(null, item);
            }
        });
    };
    PasswordsFilePersistence.prototype.createUserPassword = function (correlationId, userPassword, callback) {
        var item = this.validateUserPassword(userPassword);
        item = _.omit(item, 'lock_until', 'pwd_fail_count', 'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire');
        item.lock = false;
        this.create(item, callback);
    };
    PasswordsFilePersistence.prototype.updateUserPassword = function (correlationId, userId, userPassword, callback) {
        var _this = this;
        userPassword = this.validateUserPassword(userPassword);
        userPassword = _.omit(userPassword, 'id');
        this.getById(userId, function (err, item) {
            if (err || item == null) {
                callback(err, null);
                return;
            }
            _.assign(item, userPassword);
            _this.save(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null, item);
            });
        });
    };
    PasswordsFilePersistence.prototype.deleteUserPassword = function (correlationId, userId, callback) {
        this.delete(userId, callback);
    };
    /**
     * Unique descriptor for the PasswordsFilePersistence component
     */
    PasswordsFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-passwords", "file", "*");
    return PasswordsFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.PasswordsFilePersistence = PasswordsFilePersistence;
