let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
import { UserPasswordsMongooseSchema } from './UserPasswordsMongooseSchema';

export class PasswordsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super('passwords', UserPasswordsMongooseSchema());
    }

}
