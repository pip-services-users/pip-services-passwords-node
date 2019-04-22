"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_clients_msgdistribution_node_1 = require("pip-clients-msgdistribution-node");
class MessageConnector {
    constructor(_logger, _messageResolver, _messageDistributionClient) {
        this._logger = _logger;
        this._messageResolver = _messageResolver;
        this._messageDistributionClient = _messageDistributionClient;
        if (_messageDistributionClient == null)
            this._logger.warn(null, 'Message distribution client was not found. Password notifications are disabled');
    }
    sendMessage(correlationId, userId, message, parameters) {
        if (this._messageDistributionClient == null)
            return;
        if (message == null)
            return;
        this._messageDistributionClient.sendMessageToRecipient(correlationId, userId, null, message, parameters, pip_clients_msgdistribution_node_1.DeliveryMethodV1.All, (err) => {
            if (err)
                this._logger.error(correlationId, err, 'Failed to send message');
        });
    }
    sendAccountLockedEmail(correlationId, userId) {
        let message = this._messageResolver.resolve("account_locked");
        this.sendMessage(correlationId, userId, message, null);
    }
    sendPasswordChangedEmail(correlationId, userId) {
        let message = this._messageResolver.resolve("password_changed");
        this.sendMessage(correlationId, userId, message, null);
    }
    sendRecoverPasswordEmail(correlationId, userId, code) {
        let message = this._messageResolver.resolve("recover_password");
        let parameters = pip_services3_commons_node_1.ConfigParams.fromTuples("code", code);
        this.sendMessage(correlationId, userId, message, parameters);
    }
}
exports.MessageConnector = MessageConnector;
//# sourceMappingURL=MessageConnector.js.map