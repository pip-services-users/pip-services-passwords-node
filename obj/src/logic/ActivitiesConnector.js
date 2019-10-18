"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
const pip_clients_activities_node_2 = require("pip-clients-activities-node");
const PasswordActivityTypeV1_1 = require("../data/version1/PasswordActivityTypeV1");
class ActivitiesConnector {
    constructor(_logger, _activitiesClient) {
        this._logger = _logger;
        this._activitiesClient = _activitiesClient;
        if (_activitiesClient == null)
            this._logger.warn(null, 'Activities client was not found. Logging password activities is disabled');
    }
    logActivity(correlationId, userId, activityType) {
        if (this._activitiesClient == null)
            return;
        let party = new pip_clients_activities_node_2.ReferenceV1(userId, 'account', null);
        let activity = new pip_clients_activities_node_1.PartyActivityV1(null, activityType, party);
        this._activitiesClient.logPartyActivity(correlationId, activity, (err) => {
            if (err)
                this._logger.error(correlationId, err, 'Failed to log user activity');
        });
    }
    logSigninActivity(correlationId, userId) {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1_1.PasswordActivityTypeV1.Signin);
    }
    logPasswordRecoveredActivity(correlationId, userId) {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1_1.PasswordActivityTypeV1.PasswordRecovered);
    }
    logPasswordChangedActivity(correlationId, userId) {
        this.logActivity(correlationId, userId, PasswordActivityTypeV1_1.PasswordActivityTypeV1.PasswordChanged);
    }
}
exports.ActivitiesConnector = ActivitiesConnector;
//# sourceMappingURL=ActivitiesConnector.js.map