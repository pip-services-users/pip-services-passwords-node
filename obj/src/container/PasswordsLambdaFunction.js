"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const PasswordsServiceFactory_1 = require("../build/PasswordsServiceFactory");
class PasswordsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("passwords", "User passwords function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-passwords', 'controller', 'default', '*', '*'));
        this._factories.add(new PasswordsServiceFactory_1.PasswordsServiceFactory());
    }
}
exports.PasswordsLambdaFunction = PasswordsLambdaFunction;
exports.handler = new PasswordsLambdaFunction().getHandler();
//# sourceMappingURL=PasswordsLambdaFunction.js.map