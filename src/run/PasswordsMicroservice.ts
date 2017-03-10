import { Microservice } from 'pip-services-runtime-node';

import { PasswordsFactory } from '../build/PasswordsFactory';

/**
 * Passwords microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
export class PasswordsMicroservice extends Microservice {
	/**
	 * Creates instance of passwords microservice.
	 */
	constructor() {
		super("pip-services-passwords", PasswordsFactory.Instance);
	}
}
