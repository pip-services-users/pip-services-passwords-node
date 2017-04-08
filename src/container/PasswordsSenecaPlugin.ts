import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { PasswordsMemoryPersistence } from '../persistence/PasswordsMemoryPersistence';
import { PasswordsFilePersistence } from '../persistence/PasswordsFilePersistence';
import { PasswordsMongoDbPersistence } from '../persistence/PasswordsMongoDbPersistence';
import { PasswordsController } from '../logic/PasswordsController';
import { PasswordsSenecaServiceV1 } from '../services/version1/PasswordsSenecaServiceV1';

export class PasswordsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-passwords', seneca, PasswordsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new PasswordsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new PasswordsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new PasswordsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new PasswordsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new PasswordsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-passwords', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-passwords', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new PasswordsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}