import { ILogger } from 'pip-services3-components-node';
import { MessageResolverV1 } from 'pip-clients-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'pip-clients-msgdistribution-node';
export declare class MessageConnector {
    private _logger;
    private _messageResolver;
    private _messageDistributionClient;
    constructor(_logger: ILogger, _messageResolver: MessageResolverV1, _messageDistributionClient: IMessageDistributionClientV1);
    private sendMessage;
    sendAccountLockedEmail(correlationId: string, userId: string): void;
    sendPasswordChangedEmail(correlationId: string, userId: string): void;
    sendRecoverPasswordEmail(correlationId: string, userId: string, code: string): void;
}
