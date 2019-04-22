import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class PasswordsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/passwords');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '1.0'));
    }
}