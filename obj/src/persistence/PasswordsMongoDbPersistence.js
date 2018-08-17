"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const UserPasswordsMongoDbSchema_1 = require("./UserPasswordsMongoDbSchema");
class PasswordsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('passwords', UserPasswordsMongoDbSchema_1.UserPasswordsMongoDbSchema());
    }
}
exports.PasswordsMongoDbPersistence = PasswordsMongoDbPersistence;
//# sourceMappingURL=PasswordsMongoDbPersistence.js.map