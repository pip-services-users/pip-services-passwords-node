"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const PasswordsServiceFactory_1 = require("../build/PasswordsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class PasswordsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("passwords", "User passwords microservice");
        this._factories.add(new PasswordsServiceFactory_1.PasswordsServiceFactory());
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory());
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory());
    }
}
exports.PasswordsProcess = PasswordsProcess;
//# sourceMappingURL=PasswordsProcess.js.map