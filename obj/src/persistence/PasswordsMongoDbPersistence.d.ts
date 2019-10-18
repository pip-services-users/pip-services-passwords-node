import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
export declare class PasswordsMongoDbPersistence extends IdentifiableMongoosePersistence<UserPasswordV1, string> implements IPasswordsPersistence {
    constructor();
}
