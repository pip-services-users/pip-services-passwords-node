let _ = require('lodash');
let async = require('async');
let crypto = require('crypto');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IdGenerator } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-commons-node';
import { BadRequestException } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { UnauthorizedException } from 'pip-services-commons-node';

import { IEmailClientV1 } from 'pip-clients-email-node';
import { EmailConnector } from './EmailConnector';

import { IActivitiesClientV1 } from 'pip-clients-activities-node';
import { ActivitiesConnector } from './ActivitiesConnector';

import { UserPasswordV1 } from '../data/version1/UserPasswordV1';
import { IPasswordsPersistence } from '../persistence/IPasswordsPersistence';
import { IPasswordsBusinessLogic } from './IPasswordsBusinessLogic';
import { PasswordsCommandSet } from './PasswordsCommandSet';

export class PasswordsController implements IConfigurable, IReferenceable, ICommandable, IPasswordsBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-passwords:persistence:*:*:1.0',
        'dependencies.activities', 'pip-services-activities:client:*:*:1.0',
        'dependencies.email', 'pip-services-email:client:*:*:1.0',

        'options.lock_timeout', 1800000, // 30 mins
        'options.attempt_timeout', 60000, // 1 min
        'options.attempt_count', 4, // 4 times
        'options.rec_expire_timeout', 24 * 3600000, // 24 hours
        'options.lock_enabled', false, // set to TRUE to enable locking logic
        'options.magic_code', null // Universal code
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(PasswordsController._defaultConfig);
    private _logger: CompositeLogger = new CompositeLogger();
    private _persistence: IPasswordsPersistence;
    private _activitiesClient: IActivitiesClientV1;
    private _activitiesConnector: ActivitiesConnector;
    private _emailClient: IEmailClientV1;
    private _emailConnector: EmailConnector;
    private _commandSet: PasswordsCommandSet;

    private _lockTimeout: number = 1800000; // 30 mins
    private _attemptTimeout: number = 60000; // 1 min
    private _attemptCount: number = 4; // 4 times
    private _recExpireTimeout: number = 24 * 3600000; // 24 hours
    private _lockEnabled: boolean = false;
    private _magicCode: string = null;

    public configure(config: ConfigParams): void {
        config = config.setDefaults(PasswordsController._defaultConfig)
        this._dependencyResolver.configure(config);

        this._lockTimeout = config.getAsIntegerWithDefault('options.lock_timeout', this._lockTimeout);
        this._attemptTimeout = config.getAsIntegerWithDefault('options.attempt_timeout', this._attemptTimeout);
        this._attemptCount = config.getAsIntegerWithDefault('options.attempt_count', this._attemptCount);
        this._recExpireTimeout = config.getAsIntegerWithDefault('options.rec_expire_timeout', this._recExpireTimeout);
        this._lockEnabled = config.getAsBooleanWithDefault('options.lock_enabled', this._lockEnabled);
        this._magicCode = config.getAsStringWithDefault('options.magic_code', this._magicCode);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IPasswordsPersistence>('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional<IActivitiesClientV1>('activities');
        this._emailClient = this._dependencyResolver.getOneOptional<IEmailClientV1>('email');

        this._activitiesConnector = new ActivitiesConnector(this._logger, this._activitiesClient);
        this._emailConnector = new EmailConnector(this._logger, this._emailClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new PasswordsCommandSet(this);
        return this._commandSet;
    }

    private generateVerificationCode(): string {
        return IdGenerator.nextShort();
    }

    private hashPassword(password: string): string {
        if (!password) return null;

        let shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        return shaSum.digest('hex');
    }

    private verifyPassword(correlationId: string, password: string,
        callback: (err: any) => void): boolean {

        if (!password) {
            callback(
                new BadRequestException(
                    correlationId, 
                    'NO_PASSWORD', 
                    'Missing user password'
                )
            );
            return false;
        }

        if (password.length < 6 || password.length > 20) {
            callback(
                new BadRequestException(
                    correlationId, 
                    'BAD_PASSWORD', 
                    'User password should be 5 to 20 symbols long'
                )
            );
            return false;
        }
        return true;
    }

    private readUserPassword(correlationId: string, userId: string,
        callback: (err: any, userPassword: UserPasswordV1) => void): void {
        this._persistence.getOneById(
            correlationId,
            userId,
            (err, item) => {
                if (item == null && err == null) {
                    err = new NotFoundException(
                        correlationId,
                        'USER_NOT_FOUND',
                        'User ' + userId + ' was not found'
                    ).withDetails('user_id', userId);
                }
                callback(err, item);
            }
        );
    }
         
    public setPassword(correlationId: string, userId: string, password: string,
        callback: (err: any) => void): void {
        password = this.hashPassword(password);
        
        let userPassword = new UserPasswordV1(userId, password);
        this._persistence.create(correlationId, userPassword, (err) => {
            callback(err); 
        });
    } 

    public deletePassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {
        this._persistence.deleteById(correlationId, userId, callback);
    } 
    
    public authenticate(correlationId: string, userId: string, password: string,
        callback: (err: any, authenticated: boolean) => void): void {
        let hashedPassword = this.hashPassword(password);
        let currentTime = new Date();
        let userPassword: UserPasswordV1;

        async.series([
        // Retrieve user password
            (callback) => {
                this.readUserPassword(
                    correlationId,
                    userId, 
                    (err, data) => {
                        userPassword = data;
                        callback(err);
                    }
                );
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
                        callback(
                            new UnauthorizedException(
                                correlationId,
                                'ACCOUNT_LOCKED',
                                'Account for user ' + userId + ' is locked'
                            )
                            .withDetails('user_id', userId)
                        );
                        return;
                    }

                    if (!passwordMatch) {
                        if (lastFailureTimeout < this._attemptTimeout)
                            userPassword.fail_count = userPassword.fail_count ? userPassword.fail_count + 1 : 1;

                        userPassword.fail_time = currentTime;

                        if (userPassword.fail_count >= this._attemptCount) {
                            userPassword.locked = true;
                            
                            callback(
                                new UnauthorizedException(
                                    correlationId,
                                    'ACCOUNT_LOCKED',
                                    'Number of attempts exceeded. Account for user ' + userId + ' was locked'
                                )
                                .withDetails('user_id', userId)
                            );

                            this._emailConnector.sendAccountLockedEmail(correlationId, userId);
                        } else { 
                            callback(
                                new UnauthorizedException(
                                    correlationId,
                                    'WRONG_PASSWORD',
                                    'Invalid password'
                                )
                                .withDetails('user_id', userId)
                            );
                        }

                        this._persistence.update(
                            correlationId,
                            userPassword,
                            (err) => {
                                if (err)
                                    this._logger.error(correlationId, err, 'Failed to save user password');
                            }
                        );

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

                this._persistence.update(
                    correlationId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logSigninActivity(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (err) callback(err, false);
            else callback(null, userPassword != null);
        });
    }

    public changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string,
        callback: (err: any) => void): void {

        let userPassword;

        if (!this.verifyPassword(correlationId, newPassword, callback)) 
            return;

        oldPassword = this.hashPassword(oldPassword);
        newPassword = this.hashPassword(newPassword);

        async.series([
        // Retrieve user
            (callback) => {
                this.readUserPassword(
                    correlationId,
                    userId,  
                    (err, data) => {
                        userPassword = data;
                        callback(err);
                    }
                );
            },
        // Verify and reset password
            (callback) => {
                // Password must be different then the previous one
                if (userPassword.password != oldPassword) {
                    callback(
                        new UnauthorizedException(
                            correlationId,
                            'WRONG_PASSWORD', 
                            'Invalid password'
                        )
                        .withDetails('user_id', userId)
                    );
                    return;
                }

                if (oldPassword === newPassword) {
                    callback(
                        new BadRequestException(
                            correlationId,
                            'PASSWORD_NOT_CHANGED',
                            'Old and new passwords are identical'
                        )
                        .withDetails('user_id', userId)
                    );
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
            (callback) => {
                this._persistence.update(
                    correlationId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordChangedActivity(correlationId, userId);
                this._emailConnector.sendPasswordChangedEmail(correlationId, userId);

                callback();
            }
        ], (err) => {
            if (callback) callback(err);
        });
    }

    public resetPassword(correlationId: string, userId: string, code: string, password: string,
        callback: (err: any) => void): void {

        let userPassword: UserPasswordV1;

        if (!this.verifyPassword(correlationId, password, callback)) 
            return;

        password = this.hashPassword(password);

        async.series([
        // Retrieve user
            (callback) => {
                this.readUserPassword(
                    correlationId,
                    userId,  
                    (err, data) => {
                        userPassword = data;
                        callback(err);
                    }
                );
            },
        // Validate reset code and reset the password
            (callback) => {
                // Todo: Remove magic code
                if (userPassword.rec_code != code && code != this._magicCode) {
                    callback(
                        new UnauthorizedException(
                            correlationId,
                            'WRONG_CODE',
                            'Invalid password recovery code ' + code
                        )
                        .withDetails('user_id', userId)
                    );
                    return;
                }

                // Check if code already expired
                if (!(userPassword.rec_expire_time > new Date())) {
                    callback(
                        new UnauthorizedException(
                            correlationId,
                            'CODE_EXPIRED',
                            'Password recovery code ' + code + ' expired'
                        )
                        .withDetails('user_id', userId)
                    );
                    return;
                }

                // Reset the password
                userPassword.password = password;
                userPassword.rec_code = null;
                userPassword.rec_expire_time = null;
                userPassword.locked = false;

                callback();
            },
        // Save the new password
            (callback) => {
                this._persistence.update(
                    correlationId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordChangedActivity(correlationId, userId);
                this._emailConnector.sendPasswordChangedEmail(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (callback) callback(err);
        });
    }

    public recoverPassword(correlationId: string, userId: string,
        callback: (err: any) => void): void {

        let userPassword: UserPasswordV1;

        async.series([
        // Retrieve user
            (callback) => {
                this.readUserPassword(
                    correlationId,
                    userId,  
                    (err, data) => {
                        userPassword = data;
                        callback(err);
                    }
                );
            },
        // Update and save recovery code
            (callback) => {
                let currentTicks = new Date().getTime();
                let expireTicks = currentTicks + this._recExpireTimeout;
                let expireTime = new Date(expireTicks);

                userPassword.rec_code = this.generateVerificationCode();
                userPassword.rec_expire_time = expireTime;

                this._persistence.update(
                    correlationId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this._activitiesConnector.logPasswordRecoveredActivity(correlationId, userId);
                this._emailConnector.sendRecoverPasswordEmail(correlationId, userId);
                callback();
            }
        ], (err) => {
            if (callback) callback(err);
        });
    }
    
}
