import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { PasswordsServiceFactory } from '../build/PasswordsServiceFactory';

export class PasswordsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("passwords", "User passwords function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '*'));
        this._factories.add(new PasswordsServiceFactory());
    }
}

export const handler = new PasswordsLambdaFunction().getHandler();