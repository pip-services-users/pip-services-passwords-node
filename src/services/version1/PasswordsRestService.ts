let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
import { IPasswordsBusinessLogic } from '../../logic/IPasswordsBusinessLogic';

export class PasswordsRestService extends RestService {       
	/**
	 * Unique descriptor for the PasswordsRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-passwords", "rest", "1.0"
	);
    
	private _logic: IPasswordsBusinessLogic;

    constructor() {
        super(PasswordsRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IPasswordsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-passwords", "*", "*")
		);

		super.link(components);		
	}

    private setPassword(req, res) {
        this._logic.setPassword(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            req.params.password,
            this.sendResult(req, res)
        );
    }    

    private deletePassword(req, res) {
        this._logic.deletePassword(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            this.sendResult(req, res)
        );
    }    

    private authenticate(req, res) {
        this._logic.authenticate(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            req.params.password,
            this.sendResult(req, res)
        );
    }    

    private changePassword(req, res) {
        this._logic.changePassword(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            req.params.old_password || req.params.password,
            req.params.new_password,
            this.sendResult(req, res)
        );
    }    

    private resetPassword(req, res) {
        this._logic.resetPassword(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            req.params.password,
            req.params.code,
            this.sendResult(req, res)
        );
    }    

    private recoverPassword(req, res) {
        this._logic.recoverPassword(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            this.sendResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('post', '/passwords', this.setPassword);
        this.registerRoute('del', '/passwords', this.deletePassword);
        this.registerRoute('get', '/passwords/authenticate', this.authenticate);
        this.registerRoute('post', '/passwords/authenticate', this.authenticate);
        this.registerRoute('get', '/passwords/:userId/authenticate', this.authenticate);
        this.registerRoute('post', '/passwords/:userId/authenticate', this.authenticate);
        this.registerRoute('get', '/passwords/change', this.changePassword);
        this.registerRoute('post', '/passwords/change', this.changePassword);
        this.registerRoute('get', '/passwords/:userId/change', this.changePassword);
        this.registerRoute('post', '/passwords/:userId/change', this.changePassword);
        this.registerRoute('get', '/passwords/reset', this.resetPassword);
        this.registerRoute('post', '/passwords/reset', this.resetPassword);
        this.registerRoute('get', '/passwords/:userId/reset', this.resetPassword);
        this.registerRoute('post', '/passwords/:userId/reset', this.resetPassword);
        this.registerRoute('get', '/passwords/recover', this.recoverPassword);
        this.registerRoute('post', '/passwords/recover', this.recoverPassword);
        this.registerRoute('get', '/passwords/:userId/recover', this.recoverPassword);
        this.registerRoute('post', '/passwords/:userId/recover', this.recoverPassword);
        this.registerRoute('del', '/passwords/:userId', this.deletePassword);
    }
}
