let PasswordsProcess = require('../obj/src/container/PasswordsProcess').PasswordsProcess;

try {
    new PasswordsProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
