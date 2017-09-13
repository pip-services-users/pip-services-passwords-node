let fs = require('fs');

import { ILogger } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';

import { IEmailClientV1 } from 'pip-clients-email-node';
import { EmailRecipientV1 } from 'pip-clients-email-node';
import { EmailMessageV1 } from 'pip-clients-email-node';

export class EmailConnector {
    private _accountLockedSubject: string;
    private _accountLockedText: string;
    private _accountLockedHtml: string;

    private _passwordChangedSubject: string;
    private _passwordChangedText: string;
    private _passwordChangedHtml: string;

    private _recoverPasswordSubject: string;
    private _recoverPasswordText: string;
    private _recoverPasswordHtml: string;

    public constructor(
        private _logger: ILogger,
        private _emailClient: IEmailClientV1
    ) {
        if (_emailClient == null)
            this._logger.warn(null, 'Email client was not found. Password notifications are disabled');

        this.loadTemplates();
    }

    private loadTemplate(name: string): string {
        let path =  __dirname + '/../../../templates/' + name;
        return fs.readFileSync(path, 'utf8');
    }

    private loadTemplates(): void {
        this._accountLockedSubject = this.loadTemplate('account_locked_subject.txt');
        this._accountLockedText = this.loadTemplate('account_locked.txt');
        this._accountLockedHtml = this.loadTemplate('account_locked.html');

        this._passwordChangedSubject = this.loadTemplate('password_changed_subject.txt');
        this._passwordChangedText = this.loadTemplate('password_changed.txt');
        this._passwordChangedHtml = this.loadTemplate('password_changed.html');

        this._recoverPasswordSubject = this.loadTemplate('recover_password_subject.txt');
        this._recoverPasswordText = this.loadTemplate('recover_password.txt');
        this._recoverPasswordHtml = this.loadTemplate('recover_password.html');
    }

    private sendEmail(correlationId: string, userId: string, message: EmailMessageV1, parameters: ConfigParams): void {
        if (this._emailClient == null) return;

        let recipient = new EmailRecipientV1(userId);
        this._emailClient.sendMessageToRecipient(
            correlationId, recipient, null, message, parameters,
            (err) => {
                if (err) this._logger.error(correlationId, err, 'Failed to send email');
            }
        );
    }

    public sendAccountLockedEmail(correlationId: string, userId: string): void {
        let message = new EmailMessageV1(
            null, null, null, 
            this._accountLockedSubject, this._accountLockedText, this._accountLockedHtml
        );
        this.sendEmail(correlationId, userId, message, null);
    }

    public sendPasswordChangedEmail(correlationId: string, userId: string): void {
        let message = new EmailMessageV1(
            null, null, null, 
            this._passwordChangedSubject, this._passwordChangedText, this._passwordChangedHtml
        );
        this.sendEmail(correlationId, userId, message, null);
    }

    public sendRecoverPasswordEmail(correlationId: string, userId: string): void {
        let message = new EmailMessageV1(
            null, null, null, 
            this._recoverPasswordSubject, this._recoverPasswordText, this._recoverPasswordHtml
        );
        this.sendEmail(correlationId, userId, message, null);
    }

}