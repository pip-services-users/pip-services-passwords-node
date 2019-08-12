"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class PasswordsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('users', 'passwords');
    }
    convertToPublic(value) {
        value = super.convertToPublic(value);
        value.change_time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(value.change_time);
        value.lock_time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(value.lock_time);
        value.fail_time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(value.fail_time);
        value.rec_expire_time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(value.rec_expire_time);
        return value;
    }
}
exports.PasswordsCouchbasePersistence = PasswordsCouchbasePersistence;
//# sourceMappingURL=PasswordsCouchbasePersistence.js.map