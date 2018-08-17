let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
import { UserPasswordsMongoDbSchema } from './UserPasswordsMongoDbSchema';

export class PasswordsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super('passwords', UserPasswordsMongoDbSchema());
    }

}
