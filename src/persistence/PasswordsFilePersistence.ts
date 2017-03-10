let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsFilePersistence extends FilePersistence implements IPasswordsPersistence {
	/**
	 * Unique descriptor for the PasswordsFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-passwords", "file", "*"
	);
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || PasswordsFilePersistence.Descriptor);
    }
    
    private validateUserPassword(item) {
        return _.pick(item, 'id', 'password', 'lock', 'lock_until', 
            'pwd_fail_count', 'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire',
            'custom_hdr', 'custom_dat');
    }        
        
    public getUserPasswordById(correlationId: string, userId: string, callback: any) {
        this.getById(userId, (err, item) => {
            if (err) callback(err);
            else {
                callback(null, item);
            }
        });
    }

    public createUserPassword(correlationId: string, userPassword: any, callback: any) {
        let item = this.validateUserPassword(userPassword);

        item = _.omit(item, 'lock_until', 'pwd_fail_count', 
            'pwd_last_fail', 'pwd_rec_code', 'pwd_rec_expire');            

        item.lock = false;

        this.create(item, callback);
    }

    public updateUserPassword(correlationId: string, userId: string, userPassword: any, callback: any) {
        userPassword = this.validateUserPassword(userPassword);
        userPassword = _.omit(userPassword, 'id');
        
        this.getById(userId, (err, item) => {
            if (err || item == null) {
                callback(err, null);
                return;
            } 
            
            _.assign(item, userPassword);
            
            this.save((err) => {
                 if (err) callback(err);
                 else callback(null, item);
            });
        });
    }

    public deleteUserPassword(correlationId: string, userId: string, callback) {
        this.delete(userId, callback);
    }
}
