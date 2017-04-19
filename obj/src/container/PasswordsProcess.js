"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const PasswordsServiceFactory_1 = require("../build/PasswordsServiceFactory");
class PasswordsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory_1.PasswordsServiceFactory());
    }
}
exports.PasswordsProcess = PasswordsProcess;
//# sourceMappingURL=PasswordsProcess.js.map