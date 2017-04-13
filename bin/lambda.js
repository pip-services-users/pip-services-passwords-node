let PasswordsLambdaFunction = require('../obj/src/container/PasswordsLambdaFunction').PasswordsLambdaFunction;

module.exports = new PasswordsLambdaFunction().getHandler();