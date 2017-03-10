"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_clients_activities_node_1 = require('pip-clients-activities-node');
var pip_clients_email_node_1 = require('pip-clients-email-node');
var PasswordsMongoDbPersistence_1 = require('../persistence/PasswordsMongoDbPersistence');
var PasswordsFilePersistence_1 = require('../persistence/PasswordsFilePersistence');
var PasswordsMemoryPersistence_1 = require('../persistence/PasswordsMemoryPersistence');
var PasswordsController_1 = require('../logic/PasswordsController');
var PasswordsRestService_1 = require('../services/version1/PasswordsRestService');
var PasswordsSenecaService_1 = require('../services/version1/PasswordsSenecaService');
var PasswordsFactory = (function (_super) {
    __extends(PasswordsFactory, _super);
    function PasswordsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance, pip_clients_activities_node_1.ActivitiesFactory.Instance, pip_clients_email_node_1.EmailFactory.Instance);
        this.register(PasswordsFilePersistence_1.PasswordsFilePersistence.Descriptor, PasswordsFilePersistence_1.PasswordsFilePersistence);
        this.register(PasswordsMemoryPersistence_1.PasswordsMemoryPersistence.Descriptor, PasswordsMemoryPersistence_1.PasswordsMemoryPersistence);
        this.register(PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence.Descriptor, PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence);
        this.register(PasswordsController_1.PasswordsController.Descriptor, PasswordsController_1.PasswordsController);
        this.register(PasswordsRestService_1.PasswordsRestService.Descriptor, PasswordsRestService_1.PasswordsRestService);
        this.register(PasswordsSenecaService_1.PasswordsSenecaService.Descriptor, PasswordsSenecaService_1.PasswordsSenecaService);
    }
    PasswordsFactory.Instance = new PasswordsFactory();
    return PasswordsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.PasswordsFactory = PasswordsFactory;
