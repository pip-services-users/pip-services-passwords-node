"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const PasswordsFactory_1 = require("../build/PasswordsFactory");
class PasswordsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("passwords", "User passwords function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-passwords', 'controller', 'default', '*', '*'));
        this._factories.add(new PasswordsFactory_1.PasswordsFactory());
    }
}
exports.PasswordsLambdaFunction = PasswordsLambdaFunction;
exports.handler = new PasswordsLambdaFunction().getHandler();
//# sourceMappingURL=PasswordsLambdaFunction.js.map