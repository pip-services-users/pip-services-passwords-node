"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const PasswordsCouchbasePersistence_1 = require("../persistence/PasswordsCouchbasePersistence");
const PasswordsMongoDbPersistence_1 = require("../persistence/PasswordsMongoDbPersistence");
const PasswordsFilePersistence_1 = require("../persistence/PasswordsFilePersistence");
const PasswordsMemoryPersistence_1 = require("../persistence/PasswordsMemoryPersistence");
const PasswordsController_1 = require("../logic/PasswordsController");
const PasswordsHttpServiceV1_1 = require("../services/version1/PasswordsHttpServiceV1");
const PasswordsCommandableGrpcServiceV1_1 = require("../services/version1/PasswordsCommandableGrpcServiceV1");
const PasswordsGrpcServiceV1_1 = require("../services/version1/PasswordsGrpcServiceV1");
class PasswordsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PasswordsServiceFactory.MemoryPersistenceDescriptor, PasswordsMemoryPersistence_1.PasswordsMemoryPersistence);
        this.registerAsType(PasswordsServiceFactory.FilePersistenceDescriptor, PasswordsFilePersistence_1.PasswordsFilePersistence);
        this.registerAsType(PasswordsServiceFactory.MongoDbPersistenceDescriptor, PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence);
        this.registerAsType(PasswordsServiceFactory.CouchbasePersistenceDescriptor, PasswordsCouchbasePersistence_1.PasswordsCouchbasePersistence);
        this.registerAsType(PasswordsServiceFactory.ControllerDescriptor, PasswordsController_1.PasswordsController);
        this.registerAsType(PasswordsServiceFactory.HttpServiceDescriptor, PasswordsHttpServiceV1_1.PasswordsHttpServiceV1);
        this.registerAsType(PasswordsServiceFactory.CommandableGrpcServiceDescriptor, PasswordsCommandableGrpcServiceV1_1.PasswordsCommandableGrpcServiceV1);
        this.registerAsType(PasswordsServiceFactory.GrpcServiceDescriptor, PasswordsGrpcServiceV1_1.PasswordsGrpcServiceV1);
    }
}
exports.PasswordsServiceFactory = PasswordsServiceFactory;
PasswordsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "factory", "default", "default", "1.0");
PasswordsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "persistence", "memory", "*", "1.0");
PasswordsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "persistence", "file", "*", "1.0");
PasswordsServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "persistence", "couchbase", "*", "1.0");
PasswordsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "persistence", "mongodb", "*", "1.0");
PasswordsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "controller", "default", "*", "1.0");
PasswordsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "service", "http", "*", "1.0");
PasswordsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "service", "commandable-grpc", "*", "1.0");
PasswordsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "service", "grpc", "*", "1.0");
//# sourceMappingURL=PasswordsServiceFactory.js.map