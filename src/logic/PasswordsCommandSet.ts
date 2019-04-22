import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IPasswordsController } from './IPasswordsController';

export class PasswordsCommandSet extends CommandSet {
    private _logic: IPasswordsController;

    constructor(logic: IPasswordsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPasswordInfoCommand());
		this.addCommand(this.makeSetPasswordCommand());
		this.addCommand(this.makeSetTempPasswordCommand());
		this.addCommand(this.makeDeletePasswordCommand());
		this.addCommand(this.makeAuthenticateCommand());
		this.addCommand(this.makeChangePasswordCommand());
		this.addCommand(this.makeValidateCodeCommand());
		this.addCommand(this.makeResetPasswordCommand());
		this.addCommand(this.makeRecoverPasswordCommand());
    }

	private makeGetPasswordInfoCommand(): ICommand {
		return new Command(
			"get_password_info",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.getPasswordInfo(correlationId, userId, (err, info) => {
					callback(err, info);
				});
            }
		);
	}

	private makeSetPasswordCommand(): ICommand {
		return new Command(
			"set_password",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('password', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let password = args.getAsNullableString("password");
                this._logic.setPassword(correlationId, userId, password, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeSetTempPasswordCommand(): ICommand {
		return new Command(
			"set_temp_password",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.setTempPassword(correlationId, userId, (err, password) => {
					callback(err, password);
				});
            }
		);
	}

	private makeDeletePasswordCommand(): ICommand {
		return new Command(
			"delete_password",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
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
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('password', TypeCode.String),
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
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('old_password', TypeCode.String)
				.withRequiredProperty('new_password', TypeCode.String),
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

	private makeValidateCodeCommand(): ICommand {
		return new Command(
			"validate_code",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('code', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let code = args.getAsNullableString("code");
                this._logic.validateCode(correlationId, userId, code, (err, valid) => {
					callback(err, err == null ? { valid: valid } : null);
				});
            }
		);
	}

	private makeResetPasswordCommand(): ICommand {
		return new Command(
			"reset_password",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('code', TypeCode.String)
				.withRequiredProperty('password', TypeCode.String),
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
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                this._logic.recoverPassword(correlationId, userId, (err) => {
					callback(err, null);
				});
            }
		);
	}

}