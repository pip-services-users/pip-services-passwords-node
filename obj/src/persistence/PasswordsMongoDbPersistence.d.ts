import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
export declare class PasswordsMongoDbPersistence extends IdentifiableMongoDbPersistence<UserPasswordV1, string> implements IPasswordsPersistence {
    constructor();
}
