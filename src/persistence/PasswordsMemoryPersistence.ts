let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { PasswordsFilePersistence } from './PasswordsFilePersistence';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsMemoryPersistence extends PasswordsFilePersistence implements IPasswordsPersistence {
	/**
	 * Unique descriptor for the PasswordsMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-passwords", "memory", "*"
	);

    constructor() {
        super(PasswordsMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
