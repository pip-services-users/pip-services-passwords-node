import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { IPasswordsBusinessLogic } from './IPasswordsBusinessLogic';

export class PasswordsCommandSet extends CommandSet {
    private _logic: IPasswordsBusinessLogic;

    constructor(logic: IPasswordsBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeSetPasswordCommand());
		this.addCommand(this.makeDeletePasswordCommand());
		this.addCommand(this.makeAuthenticateCommand());
		this.addCommand(this.makeChangePasswordCommand());
		this.addCommand(this.makeResetPasswordCommand());
		this.addCommand(this.makeRecoverPasswordCommand());
    }

	private makeSetPasswordCommand(): ICommand {
		return new Command(
			"set_password",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let password = args.getAsNullableString("password");
                this._logic.setPassword(correlationId, userId, password, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeDeletePasswordCommand(): ICommand {
		return new Command(
			"delete_password",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.deletePassword(correlationId, userId, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeAuthenticateCommand(): ICommand {
		return new Command(
			"authenticate",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let password = args.getAsNullableString("password");
                this._logic.authenticate(correlationId, userId, password, (err, authenticated) => {
					callback(err, { authenticated: authenticated });
				});
            }
		);
	}

	private makeChangePasswordCommand(): ICommand {
		return new Command(
			"change_password",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let oldPassword = args.getAsNullableString("old_password");
                let newPassword = args.getAsNullableString("new_password");
                this._logic.changePassword(correlationId, userId, oldPassword, newPassword, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeResetPasswordCommand(): ICommand {
		return new Command(
			"reset_password",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let code = args.getAsNullableString("code");
                let password = args.getAsNullableString("password");
                this._logic.resetPassword(correlationId, userId, code, password, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeRecoverPasswordCommand(): ICommand {
		return new Command(
			"recover_password",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.recoverPassword(correlationId, userId, (err) => {
					callback(err, null);
				});
            }
		);
	}

}