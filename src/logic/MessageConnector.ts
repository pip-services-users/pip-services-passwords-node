import { ILogger } from 'pip-services3-components-node';
import { ConfigParams } from 'pip-services3-commons-node';

import { MessageV1 } from 'pip-clients-msgdistribution-node';
import { DeliveryMethodV1 } from 'pip-clients-msgdistribution-node';
import { MessageResolverV1 } from 'pip-clients-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'pip-clients-msgdistribution-node';

export class MessageConnector {
    public constructor(
        private _logger: ILogger,
        private _messageResolver: MessageResolverV1,
        private _messageDistributionClient: IMessageDistributionClientV1
    ) {
        if (_messageDistributionClient == null)
            this._logger.warn(null, 'Message distribution client was not found. Password notifications are disabled');
    }

    private sendMessage(correlationId: string, userId: string, message: MessageV1, parameters: ConfigParams): void {
        if (this._messageDistributionClient == null) return;
        if (message == null) return;

        this._messageDistributionClient.sendMessageToRecipient(
            correlationId, userId, null, message, parameters, DeliveryMethodV1.All,
            (err) => {
                if (err) this._logger.error(correlationId, err, 'Failed to send message');
            }
        );
    }

    public sendAccountLockedEmail(correlationId: string, userId: string): void {
        let message = this._messageResolver.resolve("account_locked");
        this.sendMessage(correlationId, userId, message, null);
    }

    public sendPasswordChangedEmail(correlationId: string, userId: string): void {
        let message = this._messageResolver.resolve("password_changed");
        this.sendMessage(correlationId, userId, message, null);
    }

    public sendRecoverPasswordEmail(correlationId: string, userId: string, code: string): void {
        let message = this._messageResolver.resolve("recover_password");
        let parameters = ConfigParams.fromTuples("code", code);
        this.sendMessage(correlationId, userId, message, parameters);
    }

}