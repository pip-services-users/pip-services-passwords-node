"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const PasswordsMongoDbPersistence_1 = require("../persistence/PasswordsMongoDbPersistence");
const PasswordsFilePersistence_1 = require("../persistence/PasswordsFilePersistence");
const PasswordsMemoryPersistence_1 = require("../persistence/PasswordsMemoryPersistence");
const PasswordsController_1 = require("../logic/PasswordsController");
const PasswordsHttpServiceV1_1 = require("../services/version1/PasswordsHttpServiceV1");
const PasswordsSenecaServiceV1_1 = require("../services/version1/PasswordsSenecaServiceV1");
class PasswordsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PasswordsServiceFactory.MemoryPersistenceDescriptor, PasswordsMemoryPersistence_1.PasswordsMemoryPersistence);
        this.registerAsType(PasswordsServiceFactory.FilePersistenceDescriptor, PasswordsFilePersistence_1.PasswordsFilePersistence);
        this.registerAsType(PasswordsServiceFactory.MongoDbPersistenceDescriptor, PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence);
        this.registerAsType(PasswordsServiceFactory.ControllerDescriptor, PasswordsController_1.PasswordsController);
        this.registerAsType(PasswordsServiceFactory.SenecaServiceDescriptor, PasswordsSenecaServiceV1_1.PasswordsSenecaServiceV1);
        this.registerAsType(PasswordsServiceFactory.HttpServiceDescriptor, PasswordsHttpServiceV1_1.PasswordsHttpServiceV1);
    }
}
PasswordsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "factory", "default", "default", "1.0");
PasswordsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "memory", "*", "1.0");
PasswordsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "file", "*", "1.0");
PasswordsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "mongodb", "*", "1.0");
PasswordsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "controller", "default", "*", "1.0");
PasswordsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "service", "seneca", "*", "1.0");
PasswordsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "service", "http", "*", "1.0");
exports.PasswordsServiceFactory = PasswordsServiceFactory;
//# sourceMappingURL=PasswordsServiceFactory.js.map