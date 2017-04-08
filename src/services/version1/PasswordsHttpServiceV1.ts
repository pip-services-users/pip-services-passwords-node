import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class PasswordsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('passwords');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '1.0'));
    }
}