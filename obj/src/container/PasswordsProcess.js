"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const PasswordsFactory_1 = require("../build/PasswordsFactory");
class PasswordsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsFactory_1.PasswordsFactory);
    }
}
exports.PasswordsProcess = PasswordsProcess;
//# sourceMappingURL=PasswordsProcess.js.map