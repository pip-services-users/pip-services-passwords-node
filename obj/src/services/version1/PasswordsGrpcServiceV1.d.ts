import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class PasswordsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getPasswordInfo(call, callback);
    private validatePassword(call, callback);
    private setPassword(call, callback);
    private setTempPassword(call, callback);
    private authenticate(call, callback);
    private deletePassword(call, callback);
    private changePassword(call, callback);
    private validateCode(call, callback);
    private resetPassword(call, callback);
    private recoverPassword(call, callback);
    register(): void;
}
