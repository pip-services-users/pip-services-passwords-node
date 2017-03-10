import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { PasswordsMicroservice } from '../run/PasswordsMicroservice';
import { IPasswordsBusinessLogic } from '../logic/IPasswordsBusinessLogic';

export class PasswordsLambdaFunction extends LambdaFunction {
    private _logic: IPasswordsBusinessLogic;

    constructor() {
        super(new PasswordsMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IPasswordsBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-passwords", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}