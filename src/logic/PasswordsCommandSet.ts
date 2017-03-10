import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

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
			this._logic,
			"set_password",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("password", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let password = args.getNullableString("password");
                this._logic.setPassword(correlationId, userId, password, callback);
            }
		);
	}

	private makeDeletePasswordCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_password",
			new Schema()
				.withProperty("user_id", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.deletePassword(correlationId, userId, callback);
            }
		);
	}

	private makeAuthenticateCommand(): ICommand {
		return new Command(
			this._logic,
			"authenticate",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("password", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let password = args.getNullableString("password");
                this._logic.authenticate(correlationId, userId, password, callback);
            }
		);
	}

	private makeChangePasswordCommand(): ICommand {
		return new Command(
			this._logic,
			"change_password",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("old_password", "string")
				.withProperty("new_password", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let oldPassword = args.getNullableString("old_password");
                let newPassword = args.getNullableString("new_password");
                this._logic.changePassword(correlationId, userId, oldPassword, newPassword, callback);
            }
		);
	}

	private makeResetPasswordCommand(): ICommand {
		return new Command(
			this._logic,
			"reset_password",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("password", "string")
				.withProperty("code", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let code = args.getNullableString("code");
                let password = args.getNullableString("password");
                this._logic.resetPassword(correlationId, userId, code, password, callback);
            }
		);
	}

	private makeRecoverPasswordCommand(): ICommand {
		return new Command(
			this._logic,
			"recover_password",
			new Schema()
				.withProperty("user_id", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.recoverPassword(correlationId, userId, callback);
            }
		);
	}

}