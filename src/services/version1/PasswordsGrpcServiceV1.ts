let _ = require('lodash');
let services = require('../../../../src/protos/passwords_v1_grpc_pb');
let messages = require('../../../../src/protos/passwords_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { UserPasswordInfoV1 } from '../../data/version1/UserPasswordInfoV1';
import { IPasswordsController } from '../../logic/IPasswordsController';
import { PasswordsGrpcConverterV1 } from './PasswordsGrpcConverterV1';

export class PasswordsGrpcServiceV1 extends GrpcService {
    private _controller: IPasswordsController;
	
    public constructor() {
        super(services.PasswordsService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-passwords", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IPasswordsController>('controller');
    }
    
    private getPasswordInfo(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        this._controller.getPasswordInfo(
            correlationId,
            userId,
            (err, result) => {
                let error = PasswordsGrpcConverterV1.fromError(err);
                let info = err == null ? PasswordsGrpcConverterV1.fromPasswordInfo(result) : null;

                let response = new messages.PasswordInfoReply();
                response.setError(error);
                response.setInfo(info);

                callback(err, response);
            }
        );
    }

    private validatePassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let password = call.request.getPassword();

        this._controller.validatePassword(
            correlationId,
            password,
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private setPassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let password = call.request.getPassword();

        this._controller.setPassword(
            correlationId,
            userId, password,
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private setTempPassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        this._controller.setTempPassword(
            correlationId,
            userId,
            (err, password) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordValueReply();
                response.setError(error);
                response.setPassword(password);

                callback(err, response);
            }
        );
    }

    private authenticate(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let password = call.request.getPassword();

        this._controller.authenticate(
            correlationId,
            userId, password,
            (err, authenticated) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordAuthenticateReply();
                response.setError(error);
                response.setAuthenticated(authenticated);

                callback(err, response);
            }
        );
    }

    private deletePassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        this._controller.deletePassword(
            correlationId,
            userId,
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private changePassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let oldPassword = call.request.getOldPassword();
        let newPassword = call.request.getNewPassword();

        this._controller.changePassword(
            correlationId,
            userId, oldPassword, newPassword,
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private validateCode(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let code = call.request.getCode();

        this._controller.validateCode(
            correlationId,
            userId, code,
            (err, valid) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordValidReply();
                response.setError(error);
                response.setValid(valid);

                callback(err, response);
            }
        );
    }

    private resetPassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let code = call.request.getCode();
        let password = call.request.getPassword();

        this._controller.resetPassword(
            correlationId,
            userId, code, password,
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private recoverPassword(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();

        this._controller.recoverPassword(
            correlationId,
            userId, 
            (err) => {
                let error = PasswordsGrpcConverterV1.fromError(err);

                let response = new messages.PasswordEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    public register() {
        this.registerMethod(
            'get_password_info', 
            null,
            this.getPasswordInfo
        );

        this.registerMethod(
            'validate_password', 
            null,
            this.validatePassword
        );

        this.registerMethod(
            'set_password', 
            null,
            this.setPassword
        );

        this.registerMethod(
            'set_temp_password', 
            null,
            this.setTempPassword
        );

        this.registerMethod(
            'delete_password', 
            null,
            this.deletePassword
        );

        this.registerMethod(
            'authenticate', 
            null,
            this.authenticate
        );

        this.registerMethod(
            'change_password',
            null, 
            this.changePassword
        );

        this.registerMethod(
            'validate_code',
            null, 
            this.validateCode
        );

        this.registerMethod(
            'reset_password',
            null, 
            this.resetPassword
        );

        this.registerMethod(
            'recover_password',
            null, 
            this.recoverPassword
        );

    }
}
