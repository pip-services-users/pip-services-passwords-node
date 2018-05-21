import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { PasswordsServiceFactory } from '../build/PasswordsServiceFactory';

export class PasswordsProcess extends ProcessContainer {

    public constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory());
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
