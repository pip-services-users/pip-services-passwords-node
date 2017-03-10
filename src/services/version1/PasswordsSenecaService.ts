let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IPasswordsBusinessLogic } from '../../logic/IPasswordsBusinessLogic';

export class PasswordsSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the PasswordsSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-passwords", "seneca", "1.0"
	);

    private _logic: IPasswordsBusinessLogic;

    constructor() {
        super(PasswordsSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IPasswordsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-passwords", "*", "*")
		);

		super.link(components);		

        this.registerCommands('passwords', this._logic.getCommands());
	}

}
