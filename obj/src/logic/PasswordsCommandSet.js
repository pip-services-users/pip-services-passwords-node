"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
class PasswordsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetPasswordInfoCommand() {
        return new pip_services3_commons_node_2.Command("get_password_info", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            this._logic.getPasswordInfo(correlationId, userId, (err, info) => {
                callback(err, info);
            });
        });
    }
    makeSetPasswordCommand() {
        return new pip_services3_commons_node_2.Command("set_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('password', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let password = args.getAsNullableString("password");
            this._logic.setPassword(correlationId, userId, password, (err) => {
                callback(err, null);
            });
        });
    }
    makeSetTempPasswordCommand() {
        return new pip_services3_commons_node_2.Command("set_temp_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            this._logic.setTempPassword(correlationId, userId, (err, password) => {
                callback(err, password);
            });
        });
    }
    makeDeletePasswordCommand() {
        return new pip_services3_commons_node_2.Command("delete_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            this._logic.deletePassword(correlationId, userId, (err) => {
                callback(err, null);
            });
        });
    }
    makeAuthenticateCommand() {
        return new pip_services3_commons_node_2.Command("authenticate", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('password', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let password = args.getAsNullableString("password");
            this._logic.authenticate(correlationId, userId, password, (err, authenticated) => {
                callback(err, { authenticated: authenticated });
            });
        });
    }
    makeChangePasswordCommand() {
        return new pip_services3_commons_node_2.Command("change_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('old_password', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('new_password', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let oldPassword = args.getAsNullableString("old_password");
            let newPassword = args.getAsNullableString("new_password");
            this._logic.changePassword(correlationId, userId, oldPassword, newPassword, (err) => {
                callback(err, null);
            });
        });
    }
    makeValidateCodeCommand() {
        return new pip_services3_commons_node_2.Command("validate_code", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('code', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let code = args.getAsNullableString("code");
            this._logic.validateCode(correlationId, userId, code, (err, valid) => {
                callback(err, err == null ? { valid: valid } : null);
            });
        });
    }
    makeResetPasswordCommand() {
        return new pip_services3_commons_node_2.Command("reset_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('code', pip_services3_commons_node_4.TypeCode.String)
            .withRequiredProperty('password', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let code = args.getAsNullableString("code");
            let password = args.getAsNullableString("password");
            this._logic.resetPassword(correlationId, userId, code, password, (err) => {
                callback(err, null);
            });
        });
    }
    makeRecoverPasswordCommand() {
        return new pip_services3_commons_node_2.Command("recover_password", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services3_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            this._logic.recoverPassword(correlationId, userId, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.PasswordsCommandSet = PasswordsCommandSet;
//# sourceMappingURL=PasswordsCommandSet.js.map