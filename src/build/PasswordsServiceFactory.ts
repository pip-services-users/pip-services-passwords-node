import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { PasswordsCouchbasePersistence } from '../persistence/PasswordsCouchbasePersistence';
import { PasswordsMongoDbPersistence } from '../persistence/PasswordsMongoDbPersistence';
import { PasswordsFilePersistence } from '../persistence/PasswordsFilePersistence';
import { PasswordsMemoryPersistence } from '../persistence/PasswordsMemoryPersistence';
import { PasswordsController } from '../logic/PasswordsController';
import { PasswordsHttpServiceV1 } from '../services/version1/PasswordsHttpServiceV1';
import { PasswordsCommandableGrpcServiceV1 } from '../services/version1/PasswordsCommandableGrpcServiceV1';
import { PasswordsGrpcServiceV1 } from '../services/version1/PasswordsGrpcServiceV1';

export class PasswordsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-passwords", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "file", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "couchbase", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-passwords", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-passwords", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-passwords", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-passwords", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-passwords", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(PasswordsServiceFactory.MemoryPersistenceDescriptor, PasswordsMemoryPersistence);
		this.registerAsType(PasswordsServiceFactory.FilePersistenceDescriptor, PasswordsFilePersistence);
		this.registerAsType(PasswordsServiceFactory.MongoDbPersistenceDescriptor, PasswordsMongoDbPersistence);
		this.registerAsType(PasswordsServiceFactory.CouchbasePersistenceDescriptor, PasswordsCouchbasePersistence);
		this.registerAsType(PasswordsServiceFactory.ControllerDescriptor, PasswordsController);
		this.registerAsType(PasswordsServiceFactory.HttpServiceDescriptor, PasswordsHttpServiceV1);
		this.registerAsType(PasswordsServiceFactory.CommandableGrpcServiceDescriptor, PasswordsCommandableGrpcServiceV1);
		this.registerAsType(PasswordsServiceFactory.GrpcServiceDescriptor, PasswordsGrpcServiceV1);
	}
	
}
