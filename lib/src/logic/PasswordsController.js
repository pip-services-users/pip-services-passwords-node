"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var pip_services_runtime_node_6 = require('pip-services-runtime-node');
var pip_services_runtime_node_7 = require('pip-services-runtime-node');
var pip_services_runtime_node_8 = require('pip-services-runtime-node');
var PasswordsCommandSet_1 = require('./PasswordsCommandSet');
var PasswordsController = (function (_super) {
    __extends(PasswordsController, _super);
    function PasswordsController() {
        _super.call(this, PasswordsController.Descriptor);
    }
    PasswordsController.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaults(PasswordsController.DefaultConfig));
    };
    PasswordsController.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-passwords", '*', '*'));
        this._email = components.getOneOptional(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-email", '*', '1.0'));
        this._activities = components.getOneOptional(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-activities", '*', '1.0'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new PasswordsCommandSet_1.PasswordsCommandSet(this);
        this.addCommandSet(commands);
    };
    PasswordsController.prototype.generateVerificationCode = function () {
        return pip_services_runtime_node_5.IdGenerator.short();
    };
    PasswordsController.prototype.hashPassword = function (password) {
        if (!password)
            return null;
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        return shaSum.digest('hex');
    };
    PasswordsController.prototype.verifyPassword = function (correlationId, password, callback) {
        if (!password) {
            callback(new pip_services_runtime_node_6.BadRequestError(this, 'NoPassword', 'Missing user password').withCorrelationId(correlationId));
            return false;
        }
        if (password.length < 6 || password.length > 20) {
            callback(new pip_services_runtime_node_6.BadRequestError(this, 'BadPassword', 'User password should be 5 to 20 symbols long').withCorrelationId(correlationId));
            return false;
        }
        return true;
    };
    PasswordsController.prototype.readUserPassword = function (correlationId, userId, callback) {
        this._db.getUserPasswordById(correlationId, userId, function (err, item) {
            if (item == null && err == null) {
                err = new pip_services_runtime_node_7.NotFoundError(null, 'UserPasswordNotFound', 'Password for user ' + userId + ' was not found')
                    .withCorrelationId(correlationId)
                    .withDetails(userId);
            }
            callback(err, item);
        });
    };
    PasswordsController.prototype.sendEmail = function (correlationId, userId, message) {
        var _this = this;
        if (this._email) {
            this._email.sendToUser(correlationId, userId, message, function (err) {
                if (err)
                    _this.error(correlationId, 'Failed while sending email', err);
            });
        }
    };
    PasswordsController.prototype.logActivity = function (correlationId, activity) {
        var _this = this;
        if (this._activities) {
            this._activities.logPartyActivity(correlationId, activity, function (err) {
                if (err)
                    _this.error(correlationId, 'Failed while logging user activity', err);
            });
        }
    };
    PasswordsController.prototype.setPassword = function (correlationId, userId, password, callback) {
        password = this.hashPassword(password);
        var userPassword = {
            id: userId,
            password: password
        };
        this._db.createUserPassword(correlationId, userPassword, callback);
    };
    PasswordsController.prototype.deletePassword = function (correlationId, userId, callback) {
        this._db.deleteUserPassword(correlationId, userId, callback);
    };
    PasswordsController.prototype.authenticate = function (correlationId, userId, password, callback) {
        var _this = this;
        var hashedPassword = this.hashPassword(password);
        var currentTime = new Date();
        var userPassword;
        var options = this._config.getOptions();
        async.series([
            // Retrieve user password
            function (callback) {
                _this.readUserPassword(correlationId, userId, function (err, data) {
                    userPassword = data;
                    callback(err);
                });
            },
            // Check password and process failed attempts
            function (callback) {
                var passwordMatch = userPassword.password == hashedPassword;
                var lastFailureTimeout = userPassword.pwd_last_fail
                    ? currentTime.getTime() - userPassword.pwd_last_fail.getTime() : null;
                //verify user account is still locked from last authorization failure or just tell user that it's user is locked
                if (!options.getBoolean('lockEnabled') && passwordMatch)
                    userPassword.lock = false;
                else {
                    if (passwordMatch && userPassword.lock && lastFailureTimeout > options.getInteger('lockTimeout'))
                        userPassword.lock = false; //unlock user
                    else if (userPassword.lock) {
                        callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'AccountLocked', 'Account for user ' + userId + ' is locked')
                            .withCorrelationId(correlationId)
                            .withDetails(userId));
                        return;
                    }
                    if (!passwordMatch) {
                        if (lastFailureTimeout < options.getInteger('attemptTimeout'))
                            userPassword.pwd_fail_count = userPassword.pwd_fail_count ? userPassword.pwd_fail_count + 1 : 1;
                        userPassword.pwd_last_fail = currentTime;
                        if (userPassword.pwd_fail_count == options.getInteger('attemptCount')) {
                            userPassword.lock = true;
                            callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'AccountLocked', 'Number of attempts exceeded. Account for user ' + userId + ' was locked')
                                .withCorrelationId(correlationId)
                                .withDetails(userId));
                            _this.sendEmail(correlationId, userId, {
                                textTemplate: __dirname + '/../../../templates/account_locked.txt',
                                htmlTemplate: __dirname + '/../../../templates/account_locked.html',
                                subjectTemplate: __dirname + '/../../../templates/account_locked_subject.txt'
                            });
                        }
                        else {
                            callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'WrongPassword', 'Invalid password')
                                .withCorrelationId(correlationId)
                                .withDetails(userId));
                        }
                        _this._db.updateUserPassword(correlationId, userId, userPassword, function (err) {
                            if (err)
                                _this.error(correlationId, 'Failed while saving user account');
                        });
                        return;
                    }
                }
                callback();
            },
            // Perform authentication and save user
            function (callback) {
                // Update user last signin date
                userPassword.pwd_fail_count = 0;
                userPassword.pwd_last_fail = null;
                _this._db.updateUserPassword(correlationId, userId, userPassword, callback);
            },
            // Asynchronous post-processing
            function (callback) {
                _this.logActivity(correlationId, {
                    type: 'signin',
                    party: {
                        id: userId,
                        name: '' // Todo: Read user account?
                    }
                });
                callback();
            }
        ], function (err) {
            callback(err, userPassword);
        });
    };
    PasswordsController.prototype.changePassword = function (correlationId, userId, oldPassword, newPassword, callback) {
        var _this = this;
        var userPassword;
        if (!this.verifyPassword(correlationId, newPassword, callback))
            return;
        oldPassword = this.hashPassword(oldPassword);
        newPassword = this.hashPassword(newPassword);
        async.series([
            // Retrieve user
            function (callback) {
                _this.readUserPassword(correlationId, userId, function (err, data) {
                    userPassword = data;
                    callback(err);
                });
            },
            // Verify and reset password
            function (callback) {
                // Password must be different then the previous one
                if (userPassword.password != oldPassword) {
                    callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'WrongPassword', 'Invalid password')
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name));
                    return;
                }
                if (oldPassword === newPassword) {
                    callback(new pip_services_runtime_node_6.BadRequestError(_this, 'PasswordsSame', 'Old and new passwords are identical')
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name));
                    return;
                }
                // Reset password
                userPassword.password = newPassword;
                userPassword.pwd_rec_code = null;
                userPassword.pwd_rec_expire = null;
                userPassword.lock = false;
                callback();
            },
            // Save the new password
            function (callback) {
                _this._db.updateUserPassword(correlationId, userId, userPassword, callback);
            },
            // Asynchronous post-processing
            function (callback) {
                _this.logActivity(correlationId, {
                    type: 'password changed',
                    party: {
                        id: userId,
                        name: '' // Todo: Read user account?
                    }
                });
                _this.sendEmail(correlationId, userId, {
                    textTemplate: __dirname + '/../../../templates/password_changed.txt',
                    htmlTemplate: __dirname + '/../../../templates/password_changed.html',
                    subjectTemplate: __dirname + '/../../../templates/password_changed_subject.txt'
                });
                callback();
            }
        ], function (err) {
            if (callback)
                callback(err, userPassword);
        });
    };
    PasswordsController.prototype.resetPassword = function (correlationId, userId, code, password, callback) {
        var _this = this;
        var userPassword;
        var options = this._config.getOptions();
        if (!this.verifyPassword(correlationId, password, callback))
            return;
        password = this.hashPassword(password);
        async.series([
            // Retrieve user
            function (callback) {
                _this.readUserPassword(correlationId, userId, function (err, data) {
                    userPassword = data;
                    callback(err);
                });
            },
            // Validate reset code and reset the password
            function (callback) {
                // Todo: Remove magic code
                if (userPassword.pwd_rec_code != code && code != options.getNullableString('magicCode')) {
                    callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'WrongCode', 'Invalid password recovery code ' + code)
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name));
                    return;
                }
                // Check if code already expired
                if (!(userPassword.pwd_rec_expire > new Date())) {
                    callback(new pip_services_runtime_node_8.UnauthorizedError(_this, 'CodeExpired', 'Password recovery code ' + code + ' expired')
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name));
                    return;
                }
                // Reset the password
                userPassword.password = password;
                userPassword.pwd_rec_code = null;
                userPassword.pwd_rec_expire = null;
                userPassword.lock = false;
                callback();
            },
            // Save the new password
            function (callback) {
                _this._db.updateUserPassword(correlationId, userId, userPassword, callback);
            },
            // Asynchronous post-processing
            function (callback) {
                _this.logActivity(correlationId, {
                    type: 'password changed',
                    party: {
                        id: userId,
                        name: '' // Todo: Read user account?
                    }
                });
                _this.sendEmail(correlationId, userId, {
                    textTemplate: __dirname + '/../../../templates/password_changed.txt',
                    htmlTemplate: __dirname + '/../../../templates/password_changed.html',
                    subjectTemplate: __dirname + '/../../../templates/password_changed_subject.txt'
                });
                callback();
            }
        ], function (err) {
            if (callback)
                callback(err, userPassword);
        });
    };
    PasswordsController.prototype.recoverPassword = function (correlationId, userId, callback) {
        var _this = this;
        var userPassword;
        var options = this._config.getOptions();
        async.series([
            // Retrieve user
            function (callback) {
                _this.readUserPassword(correlationId, userId, function (err, data) {
                    userPassword = data;
                    callback(err);
                });
            },
            // Update and save recovery code
            function (callback) {
                var currentTicks = new Date().getTime();
                var expireTicks = currentTicks + options.getInteger('codeExpirationTimeout');
                var expireTime = new Date(expireTicks);
                userPassword.pwd_rec_code = _this.generateVerificationCode();
                userPassword.pwd_rec_expire = expireTime;
                _this._db.updateUserPassword(correlationId, userId, userPassword, callback);
            },
            // Asynchronous post-processing
            function (callback) {
                _this.logActivity(correlationId, {
                    type: 'password recovered',
                    party: {
                        id: userId,
                        name: '' // Todo: Retrieve user account
                    }
                });
                _this.sendEmail(correlationId, userId, {
                    textTemplate: __dirname + '/../../../templates/recover_password.txt',
                    htmlTemplate: __dirname + '/../../../templates/recover_password.html',
                    subjectTemplate: __dirname + '/../../../templates/recover_password_subject.txt',
                    content: {
                        code: userPassword.pwd_rec_code
                    },
                });
                callback();
            }
        ], function (err) {
            if (callback)
                callback(err, userPassword);
        });
    };
    /**
     * Unique descriptor for the PasswordsController component
     */
    PasswordsController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-passwords", "*", "*");
    PasswordsController.DefaultConfig = pip_services_runtime_node_3.DynamicMap.fromValue({
        options: {
            lockTimeout: 1800000,
            attemptTimeout: 60000,
            attemptCount: 4,
            codeExpirationTimeout: 24 * 3600000,
            lockEnabled: false,
            magicCode: 'magic' // Universal code
        }
    });
    return PasswordsController;
}(pip_services_runtime_node_4.AbstractController));
exports.PasswordsController = PasswordsController;
