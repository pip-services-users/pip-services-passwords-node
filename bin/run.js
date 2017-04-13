let PasswordsProcess = require('../obj/src/container/PasswordsProcess').PasswordsProcess;

try {
    new PasswordsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
