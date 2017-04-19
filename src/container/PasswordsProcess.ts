import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { PasswordsServiceFactory } from '../build/PasswordsServiceFactory';

export class PasswordsProcess extends ProcessContainer {

    public constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory());
    }

}
