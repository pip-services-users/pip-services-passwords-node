"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const PasswordsMemoryPersistence_1 = require("../persistence/PasswordsMemoryPersistence");
const PasswordsFilePersistence_1 = require("../persistence/PasswordsFilePersistence");
const PasswordsMongoDbPersistence_1 = require("../persistence/PasswordsMongoDbPersistence");
const PasswordsController_1 = require("../logic/PasswordsController");
const PasswordsSenecaServiceV1_1 = require("../services/version1/PasswordsSenecaServiceV1");
class PasswordsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-passwords', seneca, PasswordsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new PasswordsController_1.PasswordsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new PasswordsMongoDbPersistence_1.PasswordsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new PasswordsFilePersistence_1.PasswordsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new PasswordsMemoryPersistence_1.PasswordsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new PasswordsSenecaServiceV1_1.PasswordsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-passwords', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-passwords', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.PasswordsSenecaPlugin = PasswordsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new PasswordsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=PasswordsSenecaPlugin.js.map