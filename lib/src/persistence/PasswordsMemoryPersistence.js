"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var PasswordsFilePersistence_1 = require('./PasswordsFilePersistence');
var PasswordsMemoryPersistence = (function (_super) {
    __extends(PasswordsMemoryPersistence, _super);
    function PasswordsMemoryPersistence() {
        _super.call(this, PasswordsMemoryPersistence.Descriptor);
    }
    PasswordsMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    PasswordsMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the PasswordsMemoryPersistence component
     */
    PasswordsMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-passwords", "memory", "*");
    return PasswordsMemoryPersistence;
}(PasswordsFilePersistence_1.PasswordsFilePersistence));
exports.PasswordsMemoryPersistence = PasswordsMemoryPersistence;
