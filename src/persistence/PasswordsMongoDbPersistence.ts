let _ = require('lodash');

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super('passwords');
    }

}
