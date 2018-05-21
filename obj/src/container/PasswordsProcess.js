"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const PasswordsServiceFactory_1 = require("../build/PasswordsServiceFactory");
class PasswordsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory_1.PasswordsServiceFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.PasswordsProcess = PasswordsProcess;
//# sourceMappingURL=PasswordsProcess.js.map