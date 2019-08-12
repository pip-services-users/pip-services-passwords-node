import { CommandSet } from 'pip-services3-commons-node';
import { IPasswordsController } from './IPasswordsController';
export declare class PasswordsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IPasswordsController);
    private makeGetPasswordInfoCommand;
    private makeSetPasswordCommand;
    private makeSetTempPasswordCommand;
    private makeDeletePasswordCommand;
    private makeAuthenticateCommand;
    private makeChangePasswordCommand;
    private makeValidateCodeCommand;
    private makeResetPasswordCommand;
    private makeRecoverPasswordCommand;
}
