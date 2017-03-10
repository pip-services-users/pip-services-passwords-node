import { ProcessRunner } from 'pip-services-runtime-node';

import { PasswordsMicroservice } from './PasswordsMicroservice';

/**
 * Passwords process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
export class PasswordsProcessRunner extends ProcessRunner {
    /**
     * Creates instance of passwords process runner
     */
    constructor() {
        super(new PasswordsMicroservice());
    }
}