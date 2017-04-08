"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const PasswordsFactory_1 = require("../build/PasswordsFactory");
class PasswordsProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Passwords components
        references.put(PasswordsFactory_1.PasswordsFactory.Descriptor, new PasswordsFactory_1.PasswordsFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("passwords", args, "./config/config.yaml");
    }
}
exports.PasswordsProcess = PasswordsProcess;
//# sourceMappingURL=PasswordsProcess.js.map