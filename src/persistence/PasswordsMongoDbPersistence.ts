let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsMongoDbPersistence extends MongoDbPersistence implements IPasswordsPersistence {
	/**
	 * Unique descriptor for the PasswordsMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-passwords", "mongodb", "*"
	);

    constructor() {
        super(PasswordsMongoDbPersistence.Descriptor, require('./UserPasswordModel'));
    }
        
    public getUserPasswordById(correlationId: string, userId: string, callback: any) {
        this.getById(userId, callback);
    }

    public createUserPassword(correlationId: string, userPassword: any, callback: any) {
        let item = _.omit(userPassword, 'lock_until', 'pwd_fail_count', 
            'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire');            

        item._id = userPassword.id;
        item.lock = false;

        this.create(item, callback);
    }

    public updateUserPassword(correlationId: string, userId: string, userPassword: any, callback: any) {
        userPassword = _.omit(userPassword, '_id');            
        this.update(userId, userPassword, callback);
    }

    public deleteUserPassword(correlationId: string, userId: string, callback) {
        this.delete(userId, callback);
    }

}
