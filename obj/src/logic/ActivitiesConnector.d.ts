import { ILogger } from 'pip-services3-components-node';
import { IActivitiesClientV1 } from 'pip-clients-activities-node';
export declare class ActivitiesConnector {
    private _logger;
    private _activitiesClient;
    constructor(_logger: ILogger, _activitiesClient: IActivitiesClientV1);
    private logActivity;
    logSigninActivity(correlationId: string, userId: string): void;
    logPasswordRecoveredActivity(correlationId: string, userId: string): void;
    logPasswordChangedActivity(correlationId: string, userId: string): void;
}
