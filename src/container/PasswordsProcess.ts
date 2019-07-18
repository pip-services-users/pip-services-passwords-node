import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { PasswordsServiceFactory } from '../build/PasswordsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';
import { DefaultGrpcFactory } from 'pip-services3-grpc-node';

export class PasswordsProcess extends ProcessContainer {

    public constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory());
        this._factories.add(new DefaultRpcFactory());
        this._factories.add(new DefaultGrpcFactory());
    }

}
