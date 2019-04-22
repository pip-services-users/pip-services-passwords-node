import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from './IPasswordsPersistence';

export class PasswordsMemoryPersistence 
    extends IdentifiableMemoryPersistence<UserPasswordV1, string> 
    implements IPasswordsPersistence {

    constructor() {
        super();
    }
}
