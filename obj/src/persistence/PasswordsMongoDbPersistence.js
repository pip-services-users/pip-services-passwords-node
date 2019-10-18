"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongoose_node_1 = require("pip-services3-mongoose-node");
const UserPasswordsMongooseSchema_1 = require("./UserPasswordsMongooseSchema");
class PasswordsMongoDbPersistence extends pip_services3_mongoose_node_1.IdentifiableMongoosePersistence {
    constructor() {
        super('passwords', UserPasswordsMongooseSchema_1.UserPasswordsMongooseSchema());
    }
}
exports.PasswordsMongoDbPersistence = PasswordsMongoDbPersistence;
//# sourceMappingURL=PasswordsMongoDbPersistence.js.map