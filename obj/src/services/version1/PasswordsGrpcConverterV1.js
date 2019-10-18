"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/passwords_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
class PasswordsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_3.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        PasswordsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: PasswordsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_4.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        PasswordsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static fromPasswordInfo(info) {
        if (info == null)
            return null;
        let obj = new messages.Password();
        obj.setId(info.id);
        obj.setChangeTime(pip_services3_commons_node_1.StringConverter.toString(info.change_time));
        obj.setLocked(info.locked);
        obj.setLockTime(pip_services3_commons_node_1.StringConverter.toString(info.lock_time));
        return obj;
    }
    static toPasswordInfo(obj) {
        if (obj == null)
            return null;
        let info = {
            id: obj.getId(),
            change_time: pip_services3_commons_node_2.DateTimeConverter.toDateTime(obj.getChangeTime()),
            locked: obj.getLocked(),
            lock_time: pip_services3_commons_node_2.DateTimeConverter.toDateTime(obj.getLockTime())
        };
        return info;
    }
}
exports.PasswordsGrpcConverterV1 = PasswordsGrpcConverterV1;
//# sourceMappingURL=PasswordsGrpcConverterV1.js.map