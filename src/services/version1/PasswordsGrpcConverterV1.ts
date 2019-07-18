let _ = require('lodash');
let messages = require('../../../../src/protos/passwords_v1_pb');

import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { UserPasswordInfoV1 } from '../../data/version1/UserPasswordInfoV1';

export class PasswordsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: PasswordsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        PasswordsGrpcConverterV1.setMap(values, map);
        return values;
    }

    public static fromPasswordInfo(info: UserPasswordInfoV1): any {
        if (info == null) return null;

        let obj = new messages.Password();

        obj.setId(info.id);
        obj.setChangeTime(StringConverter.toString(info.change_time))
        obj.setLocked(info.locked);
        obj.setLockTime(StringConverter.toString(info.lock_time))
    
        return obj;
    }

    public static toPasswordInfo(obj: any): UserPasswordInfoV1 {
        if (obj == null) return null;

        let info: UserPasswordInfoV1 = {
            id: obj.getId(),
            change_time: DateTimeConverter.toDateTime(obj.getChangeTime()),
            locked: obj.getLocked(),
            lock_time: DateTimeConverter.toDateTime(obj.getLockTime())
        };

        return info;
    }

}