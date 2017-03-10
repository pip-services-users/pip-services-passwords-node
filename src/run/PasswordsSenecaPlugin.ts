import { SenecaPlugin } from 'pip-services-runtime-node';

import { PasswordsMicroservice} from './PasswordsMicroservice';

export class PasswordsSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('passwords', new PasswordsMicroservice());
    }
}