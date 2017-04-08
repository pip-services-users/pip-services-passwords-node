export interface IPasswordsBusinessLogic {
    setPassword(correlationId: string, userId: string, password: string, callback: (err: any) => void): void;
    deletePassword(correlationId: string, userId: string, callback: (err: any) => void): void;
    authenticate(correlationId: string, userId: string, password: string, callback: (err: any, authenticated: boolean) => void): void;
    changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string, callback: (err: any) => void): void;
    resetPassword(correlationId: string, userId: string, code: string, password: string, callback: (err: any) => void): void;
    recoverPassword(correlationId: string, userId: string, callback: (err: any) => void): void;
}
