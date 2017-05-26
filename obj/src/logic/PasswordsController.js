"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let crypto = require('crypto');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const EmailConnector_1 = require("./EmailConnector");
const ActivitiesConnector_1 = require("./ActivitiesConnector");
const UserPasswordV1_1 = require("../data/version1/UserPasswordV1");
const PasswordsCommandSet_1 = require("./PasswordsCommandSet");
class PasswordsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(PasswordsController._defaultConfig);
        this._logger = new pip_services_commons_node_4.CompositeLogger();
        this._lockTimeout = 1800000; // 30 mins
        this._attemptTimeout = 60000; // 1 min
        this._attemptCount = 4; // 4 times
        this._recExpireTimeout = 24 * 3600000; // 24 hours
        this._lockEnabled = false;
        this._magicCode = null;
    }
    configure(config) {
        config = config.setDefaults(PasswordsController._defaultConfig);
        this._dependencyResolver.configure(config);
        this._lockTimeout = config.getAsIntegerWithDefault('options.lock_timeout', this._lockTimeout);
        this._attemptTimeout = config.getAsIntegerWithDefault('options.attempt_timeout', this._attemptTimeout);
        this._attemptCount = config.getAsIntegerWithDefault('options.attempt_count', this._attemptCount);
        this._recExpireTimeout = config.getAsIntegerWithDefault('options.rec_expire_timeout', this._recExpireTimeout);
        this._lockEnabled = config.getAsBooleanWithDefault('options.lock_enabled', this._lockEnabled);
        this._magicCode = config.getAsStringWithDefault('options.magic_code', this._magicCode);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional('activities');
        this._emailClient = this._dependencyResolver.getOneOptional('email');
        this._activitiesConnector = new ActivitiesConnector_1.ActivitiesConnector(this._logger, this._activitiesClient);
        this._emailConnector = new EmailConnector_1.EmailConnector(this._logger, this._emailClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new PasswordsCommandSet_1.PasswordsCommandSet(this);
        return this._commandSet;
    }
    generateVerificationCode() {
        return pip_services_commons_node_3.IdGenerator.nextShort();
    }
    hashPassword(password) {
        if (!password)
            return null;
        let shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        return shaSum.digest('hex');
    }
    verifyPassword(correlationId, password, callback) {
        if (!password) {
            callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'NO_PASSWORD', 'Missing user password'));
            return false;
        }
        if (password.length < 6 || password.length > 20) {
            callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'BAD_PASSWORD', 'User password should be 5 to 20 symbols long'));
            return false;
        }
        return true;
    }
    readUserPassword(correlationId, userId, callback) {
        this._persistence.getOneById(correlationId, userId, (err, item) => {
            if (item == null && err == null) {
                err = new pip_services_commons_node_6.NotFoundException(correlationId, 'USER_NOT_FOUND', 'User ' + userId + ' was not found').withDetails('user_id', userId);
            }
            callback(err, item);
        });
    }
    validatePassword(correlationId, password, callback) {
        if (this.verifyPassword(correlationId, password, callback))
            return;
        callback(null);
    }
    getPasswordInfo(correlationId, userId, callback) {
        this.readUserPassword(correlationId, userId, (err, data) => {
            if (data) {
                let info = {
                    id: data.id,
                    change_time: data.change_time,
                    locked: data.locked,
                    lock_time: data.lock_time
                };
                callback(err, info);
            }
            else {
                callback(err, null);
            }
        });
    }
    setPassword(correlationId, userId, password, callback) {
        password = this.hashPassword(password);
        let userPassword = new UserPasswordV1_1.UserPasswordV1(userId, password);
        this._persistence.create(correlationId, userPassword, (err) => {
            callback(err);
        });
    }
    setTempPassword(correlationId, userId, callback) {
        // Todo: Improve password generation
        let password = 'pass' + Math.floor(1000 * Math.random() * 9000);
        let passwordHash = this.hashPassword(password);
        let userPassword = new UserPasswordV1_1.UserPasswordV1(userId, passwordHash);
        userPassword.change_time = new Date();
        this._persistence.create(correlationId, userPassword, (err) => {
            callback(err, err == null ? password : null);
        });
    }
    deletePassword(correlationId, userId, callback) {
        this._persistence.deleteById(correlationId, userId, callback);
    }
    authenticate(correlationId, userId, password, callback) {
        let hashedPassword = this.hashPassword(password);
        let currentTime = new Date();
        let userPassword;
        async.series([
            // Retrieve user password
            (callback) => {
                this.readUserPassword(correlationId, userId, (err, data) => {
                    userPassword = data;
                    callback(err);
                });
            },
            // Check password and process failed attempts
            (callback) => {
                let passwordMatch = userPassword.password == hashedPassword;
                let lastFailureTimeout = userPassword.fail_time
                    ? currentTime.getTime() - userPassword.fail_time.getTime() : null;
                //verify user account is still locked from last authorization failure or just tell user that it's user is locked
                if (!this._lockEnabled && passwordMatch)
                    userPassword.locked = false;
                else {
                    if (passwordMatch && userPassword.locked && lastFailureTimeout > this._lockTimeout)
                        userPassword.locked = false; //unlock user
                    else if (userPassword.locked) {
                        callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'ACCOUNT_LOCKED', 'Account for user ' + userId + ' is locked')
                            .withDetails('user_id', userId));
                        return;
                    }
                    if (!passwordMatch) {
                        if (lastFailureTimeout < this._attemptTimeout)
                            userPassword.fail_count = userPassword.fail_count ? userPassword.fail_count + 1 : 1;
                        userPassword.fail_time = currentTime;
                        if (userPassword.fail_count >= this._attemptCount) {
                            userPassword.locked = true;
                            callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'ACCOUNT_LOCKED', 'Number of attempts exceeded. Account for user ' + userId + ' was locked')
                                .withDetails('user_id', userId));
                            this._emailConnector.sendAccountLockedEmail(correlationId, userId);
                        }
                        else {
                            callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'WRONG_PASSWORD', 'Invalid password')
                                .withDetails('user_id', userId));
                        }
                        this._persistence.update(correlationId, userPassword, (err) => {
                            if (err)
                                this._logger.error(correlationId, err, 'Failed to save user password');
                        });
                        return;
                    }
                }
                callback();
            },
            // Perform authentication and save user
            (callback) => {
                // Update user last signin date
                userPassword.fail_count = 0;
                userPassword.fail_time = null;
                this._persistence.update(correlationId, userPassword, callback);
            },
            // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logSigninActivity(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (err)
                callback(err, false);
            else
                callback(null, userPassword != null);
        });
    }
    changePassword(correlationId, userId, oldPassword, newPassword, callback) {
        let userPassword;
        if (!this.verifyPassword(correlationId, newPassword, callback))
            return;
        oldPassword = this.hashPassword(oldPassword);
        newPassword = this.hashPassword(newPassword);
        async.series([
            // Retrieve user
            (callback) => {
                this.readUserPassword(correlationId, userId, (err, data) => {
                    userPassword = data;
                    callback(err);
                });
            },
            // Verify and reset password
            (callback) => {
                // Password must be different then the previous one
                if (userPassword.password != oldPassword) {
                    callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'WRONG_PASSWORD', 'Invalid password')
                        .withDetails('user_id', userId));
                    return;
                }
                if (oldPassword === newPassword) {
                    callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'PASSWORD_NOT_CHANGED', 'Old and new passwords are identical')
                        .withDetails('user_id', userId));
                    return;
                }
                // Reset password
                userPassword.password = newPassword;
                userPassword.pwd_rec_code = null;
                userPassword.pwd_rec_expire = null;
                userPassword.lock = false;
                // Todo: Add change password policy
                userPassword.change_time = null;
                callback();
            },
            // Save the new password
            (callback) => {
                this._persistence.update(correlationId, userPassword, callback);
            },
            // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordChangedActivity(correlationId, userId);
                this._emailConnector.sendPasswordChangedEmail(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (callback)
                callback(err);
        });
    }
    validateCode(correlationId, userId, code, callback) {
        this.readUserPassword(correlationId, userId, (err, data) => {
            if (err == null && data != null) {
                let valid = code == this._magicCode
                    || (data.rec_code == code && data.rec_expire_time > new Date());
                callback(null, valid);
            }
            else {
                callback(err, false);
            }
        });
    }
    resetPassword(correlationId, userId, code, password, callback) {
        let userPassword;
        if (!this.verifyPassword(correlationId, password, callback))
            return;
        password = this.hashPassword(password);
        async.series([
            // Retrieve user
            (callback) => {
                this.readUserPassword(correlationId, userId, (err, data) => {
                    userPassword = data;
                    callback(err);
                });
            },
            // Validate reset code and reset the password
            (callback) => {
                // Todo: Remove magic code
                if (userPassword.rec_code != code && code != this._magicCode) {
                    callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'WRONG_CODE', 'Invalid password recovery code ' + code)
                        .withDetails('user_id', userId));
                    return;
                }
                // Check if code already expired
                if (!(userPassword.rec_expire_time > new Date())) {
                    callback(new pip_services_commons_node_5.BadRequestException(correlationId, 'CODE_EXPIRED', 'Password recovery code ' + code + ' expired')
                        .withDetails('user_id', userId));
                    return;
                }
                // Reset the password
                userPassword.password = password;
                userPassword.rec_code = null;
                userPassword.rec_expire_time = null;
                userPassword.locked = false;
                // Todo: Add change password policy
                userPassword.change_time = null;
                callback();
            },
            // Save the new password
            (callback) => {
                this._persistence.update(correlationId, userPassword, callback);
            },
            // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordChangedActivity(correlationId, userId);
                this._emailConnector.sendPasswordChangedEmail(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (callback)
                callback(err);
        });
    }
    recoverPassword(correlationId, userId, callback) {
        let userPassword;
        async.series([
            // Retrieve user
            (callback) => {
                this.readUserPassword(correlationId, userId, (err, data) => {
                    userPassword = data;
                    callback(err);
                });
            },
            // Update and save recovery code
            (callback) => {
                let currentTicks = new Date().getTime();
                let expireTicks = currentTicks + this._recExpireTimeout;
                let expireTime = new Date(expireTicks);
                userPassword.rec_code = this.generateVerificationCode();
                userPassword.rec_expire_time = expireTime;
                this._persistence.update(correlationId, userPassword, callback);
            },
            // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordRecoveredActivity(correlationId, userId);
                this._emailConnector.sendRecoverPasswordEmail(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (callback)
                callback(err);
        });
    }
}
PasswordsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-passwords:persistence:*:*:1.0', 'dependencies.activities', 'pip-services-activities:client:*:*:1.0', 'dependencies.email', 'pip-services-email:client:*:*:1.0', 'options.lock_timeout', 1800000, // 30 mins
'options.attempt_timeout', 60000, // 1 min
'options.attempt_count', 4, // 4 times
'options.rec_expire_timeout', 24 * 3600000, // 24 hours
'options.lock_enabled', false, // set to TRUE to enable locking logic
'options.magic_code', null // Universal code
);
exports.PasswordsController = PasswordsController;
//# sourceMappingURL=PasswordsController.js.map