"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/passwords_v1_grpc_pb');
let messages = require('../../../../src/protos/passwords_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const PasswordsGrpcConverterV1_1 = require("./PasswordsGrpcConverterV1");
class PasswordsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.PasswordsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-passwords", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getPasswordInfo(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        this._controller.getPasswordInfo(correlationId, userId, (err, result) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let info = err == null ? PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromPasswordInfo(result) : null;
            let response = new messages.PasswordInfoReply();
            response.setError(error);
            response.setInfo(info);
            callback(err, response);
        });
    }
    validatePassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let password = call.request.getPassword();
        this._controller.validatePassword(correlationId, password, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    setPassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let password = call.request.getPassword();
        this._controller.setPassword(correlationId, userId, password, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    setTempPassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        this._controller.setTempPassword(correlationId, userId, (err, password) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordValueReply();
            response.setError(error);
            response.setPassword(password);
            callback(err, response);
        });
    }
    authenticate(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let password = call.request.getPassword();
        this._controller.authenticate(correlationId, userId, password, (err, authenticated) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordAuthenticateReply();
            response.setError(error);
            response.setAuthenticated(authenticated);
            callback(err, response);
        });
    }
    deletePassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        this._controller.deletePassword(correlationId, userId, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    changePassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let oldPassword = call.request.getOldPassword();
        let newPassword = call.request.getNewPassword();
        this._controller.changePassword(correlationId, userId, oldPassword, newPassword, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    validateCode(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let code = call.request.getCode();
        this._controller.validateCode(correlationId, userId, code, (err, valid) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordValidReply();
            response.setError(error);
            response.setValid(valid);
            callback(err, response);
        });
    }
    resetPassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let code = call.request.getCode();
        let password = call.request.getPassword();
        this._controller.resetPassword(correlationId, userId, code, password, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    recoverPassword(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        this._controller.recoverPassword(correlationId, userId, (err) => {
            let error = PasswordsGrpcConverterV1_1.PasswordsGrpcConverterV1.fromError(err);
            let response = new messages.PasswordEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_password_info', null, this.getPasswordInfo);
        this.registerMethod('validate_password', null, this.validatePassword);
        this.registerMethod('set_password', null, this.setPassword);
        this.registerMethod('set_temp_password', null, this.setTempPassword);
        this.registerMethod('delete_password', null, this.deletePassword);
        this.registerMethod('authenticate', null, this.authenticate);
        this.registerMethod('change_password', null, this.changePassword);
        this.registerMethod('validate_code', null, this.validateCode);
        this.registerMethod('reset_password', null, this.resetPassword);
        this.registerMethod('recover_password', null, this.recoverPassword);
    }
}
exports.PasswordsGrpcServiceV1 = PasswordsGrpcServiceV1;
//# sourceMappingURL=PasswordsGrpcServiceV1.js.map