import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class PasswordsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('passwords');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '1.0'));
    }
}