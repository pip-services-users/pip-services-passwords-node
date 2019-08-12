import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
export declare class PasswordsCouchbasePersistence extends IdentifiableCouchbasePersistence<UserPasswordV1, string> implements IPasswordsPersistence {
    constructor();
    protected convertToPublic(value: any): UserPasswordV1;
}
