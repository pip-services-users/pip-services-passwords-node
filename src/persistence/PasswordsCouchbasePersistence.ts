let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super('users', 'passwords');
    }

    protected convertToPublic(value: any): UserPasswordV1 {
        value = super.convertToPublic(value);

        value.change_time = DateTimeConverter.toNullableDateTime(value.change_time);
        value.lock_time = DateTimeConverter.toNullableDateTime(value.lock_time);
        value.fail_time = DateTimeConverter.toNullableDateTime(value.fail_time);
        value.rec_expire_time = DateTimeConverter.toNullableDateTime(value.rec_expire_time);
    
        return value;
    }

}
