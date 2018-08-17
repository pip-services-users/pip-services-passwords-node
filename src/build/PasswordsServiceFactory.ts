import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { PasswordsMongoDbPersistence } from '../persistence/PasswordsMongoDbPersistence';
import { PasswordsFilePersistence } from '../persistence/PasswordsFilePersistence';
import { PasswordsMemoryPersistence } from '../persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../logic/PasswordsController';
import { PasswordsHttpServiceV1 } from '../services/version1/PasswordsHttpServiceV1';
import { PasswordsSenecaServiceV1 } from '../services/version1/PasswordsSenecaServiceV1'; 

export class PasswordsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-passwords", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-passwords", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-passwords", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-passwords", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(PasswordsServiceFactory.MemoryPersistenceDescriptor, PasswordsMemoryPersistence);
		this.registerAsType(PasswordsServiceFactory.FilePersistenceDescriptor, PasswordsFilePersistence);
		this.registerAsType(PasswordsServiceFactory.MongoDbPersistenceDescriptor, PasswordsMongoDbPersistence);
		this.registerAsType(PasswordsServiceFactory.ControllerDescriptor, PasswordsController);
		this.registerAsType(PasswordsServiceFactory.SenecaServiceDescriptor, PasswordsSenecaServiceV1);
		this.registerAsType(PasswordsServiceFactory.HttpServiceDescriptor, PasswordsHttpServiceV1);
	}
	
}
