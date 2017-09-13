"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
const pip_clients_email_node_1 = require("pip-clients-email-node");
const pip_clients_email_node_2 = require("pip-clients-email-node");
class EmailConnector {
    constructor(_logger, _emailClient) {
        this._logger = _logger;
        this._emailClient = _emailClient;
        if (_emailClient == null)
            this._logger.warn(null, 'Email client was not found. Password notifications are disabled');
        this.loadTemplates();
    }
    loadTemplate(name) {
        let path = __dirname + '/../../../templates/' + name;
        return fs.readFileSync(path, 'utf8');
    }
    loadTemplates() {
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
    sendEmail(correlationId, userId, message, parameters) {
        if (this._emailClient == null)
            return;
        let recipient = new pip_clients_email_node_1.EmailRecipientV1(userId);
        this._emailClient.sendMessageToRecipient(correlationId, recipient, null, message, parameters, (err) => {
            if (err)
                this._logger.error(correlationId, err, 'Failed to send email');
        });
    }
    sendAccountLockedEmail(correlationId, userId) {
        let message = new pip_clients_email_node_2.EmailMessageV1(null, null, null, this._accountLockedSubject, this._accountLockedText, this._accountLockedHtml);
        this.sendEmail(correlationId, userId, message, null);
    }
    sendPasswordChangedEmail(correlationId, userId) {
        let message = new pip_clients_email_node_2.EmailMessageV1(null, null, null, this._passwordChangedSubject, this._passwordChangedText, this._passwordChangedHtml);
        this.sendEmail(correlationId, userId, message, null);
    }
    sendRecoverPasswordEmail(correlationId, userId) {
        let message = new pip_clients_email_node_2.EmailMessageV1(null, null, null, this._recoverPasswordSubject, this._recoverPasswordText, this._recoverPasswordHtml);
        this.sendEmail(correlationId, userId, message, null);
    }
}
exports.EmailConnector = EmailConnector;
//# sourceMappingURL=EmailConnector.js.map