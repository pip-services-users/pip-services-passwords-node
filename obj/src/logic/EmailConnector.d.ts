import { ILogger } from 'pip-services-commons-node';
import { IEmailClientV1 } from 'pip-clients-email-node';
export declare class EmailConnector {
    private _logger;
    private _emailClient;
    private _accountLockedSubject;
    private _accountLockedText;
    private _accountLockedHtml;
    private _passwordChangedSubject;
    private _passwordChangedText;
    private _passwordChangedHtml;
    private _recoverPasswordSubject;
    private _recoverPasswordText;
    private _recoverPasswordHtml;
    constructor(_logger: ILogger, _emailClient: IEmailClientV1);
    private loadTemplate(name);
    private loadTemplates();
    private sendEmail(correlationId, userId, message, parameters);
    sendAccountLockedEmail(correlationId: string, userId: string): void;
    sendPasswordChangedEmail(correlationId: string, userId: string): void;
    sendRecoverPasswordEmail(correlationId: string, userId: string): void;
}
