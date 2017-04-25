import { CommandSet } from 'pip-services-commons-node';
import { IPasswordsController } from './IPasswordsController';
export declare class PasswordsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPasswordsController);
    private makeSetPasswordCommand();
    private makeDeletePasswordCommand();
    private makeAuthenticateCommand();
    private makeChangePasswordCommand();
    private makeResetPasswordCommand();
    private makeRecoverPasswordCommand();
}
