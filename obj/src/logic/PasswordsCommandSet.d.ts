import { CommandSet } from 'pip-services-commons-node';
import { IPasswordsBusinessLogic } from './IPasswordsBusinessLogic';
export declare class PasswordsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPasswordsBusinessLogic);
    private makeSetPasswordCommand();
    private makeDeletePasswordCommand();
    private makeAuthenticateCommand();
    private makeChangePasswordCommand();
    private makeResetPasswordCommand();
    private makeRecoverPasswordCommand();
}
