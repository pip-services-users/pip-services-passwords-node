import { IBusinessLogic } from 'pip-services-runtime-node';

export interface IPasswordsBusinessLogic extends IBusinessLogic {
    setPassword(correlationId: string, userId: string, password: string, callback: any): void;
    deletePassword(correlationId: string, userId: string, callback: any): void;
    authenticate(correlationId: string, userId: string, password: string, callback: any): void;
    changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string, callback: any): void;
    resetPassword(correlationId: string, userId: string, code: string, password: string, callback: any): void;
    recoverPassword(correlationId: string, userId: string, callback: any): void;
}
