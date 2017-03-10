"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsCommandSet = (function (_super) {
    __extends(PasswordsCommandSet, _super);
    function PasswordsCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeSetPasswordCommand());
        this.addCommand(this.makeDeletePasswordCommand());
        this.addCommand(this.makeAuthenticateCommand());
        this.addCommand(this.makeChangePasswordCommand());
        this.addCommand(this.makeResetPasswordCommand());
        this.addCommand(this.makeRecoverPasswordCommand());
    }
    PasswordsCommandSet.prototype.makeSetPasswordCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "set_password", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("password", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var password = args.getNullableString("password");
            _this._logic.setPassword(correlationId, userId, password, callback);
        });
    };
    PasswordsCommandSet.prototype.makeDeletePasswordCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_password", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.deletePassword(correlationId, userId, callback);
        });
    };
    PasswordsCommandSet.prototype.makeAuthenticateCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "authenticate", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("password", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var password = args.getNullableString("password");
            _this._logic.authenticate(correlationId, userId, password, callback);
        });
    };
    PasswordsCommandSet.prototype.makeChangePasswordCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "change_password", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("old_password", "string")
            .withProperty("new_password", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var oldPassword = args.getNullableString("old_password");
            var newPassword = args.getNullableString("new_password");
            _this._logic.changePassword(correlationId, userId, oldPassword, newPassword, callback);
        });
    };
    PasswordsCommandSet.prototype.makeResetPasswordCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "reset_password", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("password", "string")
            .withProperty("code", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var code = args.getNullableString("code");
            var password = args.getNullableString("password");
            _this._logic.resetPassword(correlationId, userId, code, password, callback);
        });
    };
    PasswordsCommandSet.prototype.makeRecoverPasswordCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "recover_password", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.recoverPassword(correlationId, userId, callback);
        });
    };
    return PasswordsCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.PasswordsCommandSet = PasswordsCommandSet;
