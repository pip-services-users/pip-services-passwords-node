import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IPasswordsBusinessLogic } from './IPasswordsBusinessLogic';
export declare class PasswordsController implements IConfigurable, IReferenceable, ICommandable, IPasswordsBusinessLogic {
    private static _defaultConfig;
    private _dependencyResolver;
    private _logger;
    private _persistence;
    private _activitiesClient;
    private _activitiesConnector;
    private _emailClient;
    private _emailConnector;
    private _commandSet;
    private _lockTimeout;
    private _attemptTimeout;
    private _attemptCount;
    private _recExpireTimeout;
    private _lockEnabled;
    private _magicCode;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    private generateVerificationCode();
    private hashPassword(password);
    private verifyPassword(correlationId, password, callback);
    private readUserPassword(correlationId, userId, callback);
    setPassword(correlationId: string, userId: string, password: string, callback: (err: any) => void): void;
    deletePassword(correlationId: string, userId: string, callback: (err: any) => void): void;
    authenticate(correlationId: string, userId: string, password: string, callback: (err: any, authenticated: boolean) => void): void;
    changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string, callback: (err: any) => void): void;
    resetPassword(correlationId: string, userId: string, code: string, password: string, callback: (err: any) => void): void;
    recoverPassword(correlationId: string, userId: string, callback: (err: any) => void): void;
}
