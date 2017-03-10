import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { ActivitiesFactory } from 'pip-clients-activities-node';
import { EmailFactory } from 'pip-clients-email-node';

import { PasswordsMongoDbPersistence } from '../persistence/PasswordsMongoDbPersistence';
import { PasswordsFilePersistence } from '../persistence/PasswordsFilePersistence';
import { PasswordsMemoryPersistence } from '../persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../logic/PasswordsController';
import { PasswordsRestService } from '../services/version1/PasswordsRestService';
import { PasswordsSenecaService } from '../services/version1/PasswordsSenecaService'; 

export class PasswordsFactory extends ComponentFactory {
	public static Instance: PasswordsFactory = new PasswordsFactory();
	
	constructor() {
		super(DefaultFactory.Instance, ActivitiesFactory.Instance, EmailFactory.Instance);

		this.register(PasswordsFilePersistence.Descriptor, PasswordsFilePersistence);
		this.register(PasswordsMemoryPersistence.Descriptor, PasswordsMemoryPersistence);
		this.register(PasswordsMongoDbPersistence.Descriptor, PasswordsMongoDbPersistence);
		this.register(PasswordsController.Descriptor, PasswordsController);
		this.register(PasswordsRestService.Descriptor, PasswordsRestService);
		this.register(PasswordsSenecaService.Descriptor, PasswordsSenecaService);
	}
	
}
