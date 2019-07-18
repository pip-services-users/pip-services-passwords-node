import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class PasswordsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/passwords');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '1.0'));
    }
}