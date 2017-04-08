import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';
export declare class PasswordsMemoryPersistence extends IdentifiableMemoryPersistence<UserPasswordV1, string> implements IPasswordsPersistence {
    constructor();
}
