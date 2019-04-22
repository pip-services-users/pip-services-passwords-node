import { ILogger } from 'pip-services3-components-node';

import { IActivitiesClientV1 } from 'pip-clients-activities-node';
import { PartyActivityV1 } from 'pip-clients-activities-node';
import { ReferenceV1 } from 'pip-clients-activities-node';

import { PasswordActivityTypeV1 } from '../data/version1/PasswordActivityTypeV1';

export class ActivitiesConnector {

    public constructor(
        private _logger: ILogger,
        private _activitiesClient: IActivitiesClientV1
    ) {
        if (_activitiesClient == null)
            this._logger.warn(null, 'Activities client was not found. Logging password activities is disabled');
    }

    private logActivity(correlationId: string, userId: string, activityType: string): void {
        if (this._activitiesClient == null) return;

        let party = new ReferenceV1(userId, 'account', null);
        let activity = new PartyActivityV1(null, activityType, party);

        this._activitiesClient.logPartyActivity(
            correlationId,
            activity,
            (err) => {
                if (err) 
                    this._logger.error(correlationId, err, 'Failed to log user activity');
            }
        );
    }

    public logSigninActivity(correlationId: string, userId: string): void {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1.Signin);
    }

    public logPasswordRecoveredActivity(correlationId: string, userId: string): void {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1.PasswordRecovered);
    }

    public logPasswordChangedActivity(correlationId: string, userId: string): void {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1.PasswordChanged);
    }

}