import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { PasswordsFactory } from '../build/PasswordsFactory';

export class PasswordsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("passwords", "User passwords function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-passwords', 'controller', 'default', '*', '*'));
        this._factories.add(new PasswordsFactory());
    }
}

export const handler = new PasswordsLambdaFunction().getHandler();