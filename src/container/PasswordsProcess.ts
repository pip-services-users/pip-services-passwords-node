import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { PasswordsFactory } from '../build/PasswordsFactory';

export class PasswordsProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Passwords components
        references.put(PasswordsFactory.Descriptor, new PasswordsFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("passwords", args, "./config/config.yaml");
    }

}
