let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super('users', 'passwords');
    }

}
