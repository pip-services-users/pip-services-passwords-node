"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class PasswordsSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('passwords');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-passwords', 'controller', 'default', '*', '1.0'));
    }
}
exports.PasswordsSenecaServiceV1 = PasswordsSenecaServiceV1;
//# sourceMappingURL=PasswordsSenecaServiceV1.js.map