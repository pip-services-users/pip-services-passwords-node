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
class PasswordsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PasswordsFactory.MemoryPersistenceDescriptor, PasswordsMemoryPersistence_1.PasswordsMemoryPersistence);
        this.registerAsType(PasswordsFactory.FilePersistenceDescriptor, PasswordsFilePersistence_1.PasswordsFilePersistence);
        this.registerAsType(PasswordsFactory.MongoDbPersistenceDescriptor, PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence);
        this.registerAsType(PasswordsFactory.ControllerDescriptor, PasswordsController_1.PasswordsController);
        this.registerAsType(PasswordsFactory.SenecaServiceDescriptor, PasswordsSenecaServiceV1_1.PasswordsSenecaServiceV1);
        this.registerAsType(PasswordsFactory.HttpServiceDescriptor, PasswordsHttpServiceV1_1.PasswordsHttpServiceV1);
    }
}
PasswordsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "factory", "default", "default", "1.0");
PasswordsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "memory", "*", "1.0");
PasswordsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "file", "*", "1.0");
PasswordsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "persistence", "mongodb", "*", "1.0");
PasswordsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "controller", "default", "*", "1.0");
PasswordsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "service", "seneca", "*", "1.0");
PasswordsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-passwords", "service", "http", "*", "1.0");
exports.PasswordsFactory = PasswordsFactory;
//# sourceMappingURL=PasswordsFactory.js.map