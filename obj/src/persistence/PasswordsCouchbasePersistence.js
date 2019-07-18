"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class PasswordsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('passwords');
    }
}
exports.PasswordsCouchbasePersistence = PasswordsCouchbasePersistence;
//# sourceMappingURL=PasswordsCouchbasePersistence.js.map