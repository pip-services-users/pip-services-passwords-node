"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class PasswordsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('passwords');
    }
}
exports.PasswordsMongoDbPersistence = PasswordsMongoDbPersistence;
//# sourceMappingURL=PasswordsMongoDbPersistence.js.map