let _ = require('lodash');
let async = require('async');
let crypto = require('crypto');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { IdGenerator } from 'pip-services-runtime-node';
import { BadRequestError } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';
import { UnauthorizedError } from 'pip-services-runtime-node';

import { Version1 as EmailV1 } from 'pip-clients-email-node';
import { Version1 as ActivitiesV1 } from 'pip-clients-activities-node';

import { IPasswordsPersistence } from '../persistence/IPasswordsPersistence';
import { PasswordsCommandSet } from './PasswordsCommandSet';

export class PasswordsController extends AbstractController {
	/**
	 * Unique descriptor for the PasswordsController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-passwords", "*", "*"
	);
    
    private static DefaultConfig: DynamicMap = DynamicMap.fromValue({
        options: {
            lockTimeout: 1800000, // 30 mins
            attemptTimeout: 60000, // 1 min
            attemptCount: 4, // 4 times
            codeExpirationTimeout: 24 * 3600000, // 24 hours
            lockEnabled: false, // set to TRUE to enable locking logic
            magicCode: 'magic' // Universal code
        }
    });

	private _db: IPasswordsPersistence;
    private _email: EmailV1.IEmailClient;
    private _activities: ActivitiesV1.IActivitiesClient;

    constructor() {
        super(PasswordsController.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaults(PasswordsController.DefaultConfig));
    }

    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._db = <IPasswordsPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-passwords", '*', '*')
    	);

        this._email = <EmailV1.IEmailClient>components.getOneOptional(
        	new ComponentDescriptor(Category.Clients, "pip-services-email", '*', '1.0')
    	);

        this._activities = <ActivitiesV1.IActivitiesClient>components.getOneOptional(
        	new ComponentDescriptor(Category.Clients, "pip-services-activities", '*', '1.0')
    	);
        
        super.link(components);

        // Add commands
        let commands = new PasswordsCommandSet(this);
        this.addCommandSet(commands);
    }

    private generateVerificationCode(): string {
        return IdGenerator.short();
    }

    private hashPassword(password: string) {
        if (!password) return null;

        let shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        return shaSum.digest('hex');
    }

    private verifyPassword(correlationId: string, password: string, callback: any) {
        if (!password) {
            callback(
                new BadRequestError(
                    this, 
                    'NoPassword', 
                    'Missing user password'
                ).withCorrelationId(correlationId)
            );
            return false;
        }
        if (password.length < 6 || password.length > 20) {
            callback(
                new BadRequestError(
                    this, 
                    'BadPassword', 
                    'User password should be 5 to 20 symbols long'
                ).withCorrelationId(correlationId)
            );
            return false;
        }
        return true;
    }

    private readUserPassword(correlationId: string, userId: string, callback: any): void {
        this._db.getUserPasswordById(
            correlationId,
            userId,
            (err, item) => {
                if (item == null && err == null) {
                    err = new NotFoundError(
                        null,
                        'UserPasswordNotFound',
                        'Password for user ' + userId + ' was not found'
                    )
                    .withCorrelationId(correlationId)
                    .withDetails(userId);
                }
                callback(err, item);
            }
        );
    }
    
    private sendEmail(correlationId: string, userId: string, message: any): void {
        if (this._email) {
            this._email.sendToUser(correlationId, userId, message, (err) => {
                if (err) this.error(correlationId, 'Failed while sending email', err);
            });
        }
    }
 
    private logActivity(correlationId: string, activity: any) {
        if (this._activities) {
            this._activities.logPartyActivity(
                correlationId,
                activity,
                (err) => {
                    if (err) this.error(correlationId, 'Failed while logging user activity', err);
                }
            );
        }
    }
    
    public setPassword(correlationId: string, userId: string, password: string, callback: any) {
        password = this.hashPassword(password);
        
        let userPassword: any = {
            id: userId,
            password: password
        };
        
        this._db.createUserPassword(correlationId, userPassword, callback);
    } 

    public deletePassword(correlationId: string, userId: string, callback: any) {
        this._db.deleteUserPassword(correlationId, userId, callback);
    } 
    
    public authenticate(correlationId: string, userId: string, password: string, callback: any) {
        let hashedPassword = this.hashPassword(password);
        let currentTime = new Date();
        let userPassword;
        let options = this._config.getOptions();

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
                let lastFailureTimeout = userPassword.pwd_last_fail
                    ? currentTime.getTime() - userPassword.pwd_last_fail.getTime() : null;

                //verify user account is still locked from last authorization failure or just tell user that it's user is locked
                if (!options.getBoolean('lockEnabled') && passwordMatch)
                    userPassword.lock = false;
                else {
                    if (passwordMatch && userPassword.lock && lastFailureTimeout > options.getInteger('lockTimeout')) 
                        userPassword.lock = false; //unlock user
                    else if (userPassword.lock) {
                        callback(
                            new UnauthorizedError(
                                this,
                                'AccountLocked',
                                'Account for user ' + userId + ' is locked'
                            )
                            .withCorrelationId(correlationId)
                            .withDetails(userId)
                        );
                        return;
                    }

                    if (!passwordMatch) {
                        if (lastFailureTimeout < options.getInteger('attemptTimeout'))
                            userPassword.pwd_fail_count = userPassword.pwd_fail_count ? userPassword.pwd_fail_count + 1 : 1;

                        userPassword.pwd_last_fail = currentTime;

                        if (userPassword.pwd_fail_count == options.getInteger('attemptCount')) {
                            userPassword.lock = true;
                            
                            callback(
                                new UnauthorizedError(
                                    this,
                                    'AccountLocked',
                                    'Number of attempts exceeded. Account for user ' + userId + ' was locked'
                                )
                                .withCorrelationId(correlationId)
                                .withDetails(userId)
                            );

                            this.sendEmail(
                                correlationId,
                                userId, 
                                {
                                    textTemplate: __dirname + '/../../../templates/account_locked.txt',
                                    htmlTemplate: __dirname + '/../../../templates/account_locked.html',
                                    subjectTemplate: __dirname + '/../../../templates/account_locked_subject.txt'
                                }
                            );
                        } else { 
                            callback(
                                new UnauthorizedError(
                                    this,
                                    'WrongPassword',
                                    'Invalid password'
                                )
                                .withCorrelationId(correlationId)
                                .withDetails(userId)
                            );
                        }

                        this._db.updateUserPassword(
                            correlationId,
                            userId,
                            userPassword,
                            (err) => {
                                if (err) this.error(correlationId, 'Failed while saving user account');
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
                userPassword.pwd_fail_count = 0;
                userPassword.pwd_last_fail = null;

                this._db.updateUserPassword(
                    correlationId,
                    userId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this.logActivity(
                    correlationId,
                    {
                        type: 'signin',
                        party: { 
                            id: userId,
                            name: '' // Todo: Read user account?
                        }
                    }
                );

                callback();
            }
        ], (err) => {
            callback(err, userPassword);
        });
    }

    public changePassword(correlationId: string, userId: string, oldPassword: string, newPassword: string, callback) {
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
                        new UnauthorizedError(
                            this,
                            'WrongPassword', 
                            'Invalid password'
                        )
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name)
                    );
                    return;
                }

                if (oldPassword === newPassword) {
                    callback(
                        new BadRequestError(
                            this,
                            'PasswordsSame',
                            'Old and new passwords are identical'
                        )
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name)
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
                this._db.updateUserPassword(
                    correlationId,
                    userId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this.logActivity(
                    correlationId,
                    {
                        type: 'password changed',
                        party: {
                            id: userId,
                            name: '' // Todo: Read user account?
                        }
                    }
                );

                this.sendEmail(
                    correlationId,
                    userId,
                    {
                        textTemplate: __dirname + '/../../../templates/password_changed.txt',
                        htmlTemplate: __dirname + '/../../../templates/password_changed.html',
                        subjectTemplate: __dirname + '/../../../templates/password_changed_subject.txt'
                    }
                );

                callback();
            }
        ], (err) => {
            if (callback) callback(err, userPassword);
        });
    }

    public resetPassword(correlationId: string, userId: string, code: string, password: string, callback) {
        let userPassword;
        let options = this._config.getOptions();

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
                if (userPassword.pwd_rec_code != code && code != options.getNullableString('magicCode')) {
                    callback(
                        new UnauthorizedError(
                            this,
                            'WrongCode',
                            'Invalid password recovery code ' + code
                        )
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name)
                    );
                    return;
                }

                // Check if code already expired
                if (!(userPassword.pwd_rec_expire > new Date())) {
                    callback(
                        new UnauthorizedError(
                            this,
                            'CodeExpired',
                            'Password recovery code ' + code + ' expired'
                        )
                        .withCorrelationId(correlationId)
                        .withDetails(userPassword.name)
                    );
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
            (callback) => {
                this._db.updateUserPassword(
                    correlationId,
                    userId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this.logActivity(
                    correlationId,
                    {
                        type: 'password changed',
                        party: {
                            id: userId,
                            name: '' // Todo: Read user account?
                        }
                    }
                );

                this.sendEmail(
                    correlationId,
                    userId,
                    {
                        textTemplate: __dirname + '/../../../templates/password_changed.txt',
                        htmlTemplate: __dirname + '/../../../templates/password_changed.html',
                        subjectTemplate: __dirname + '/../../../templates/password_changed_subject.txt'
                    }
                );

                callback();
            }
        ], (err) => {
            if (callback) callback(err, userPassword);
        })
    }

    public recoverPassword(correlationId: string, userId: string, callback) {
        let userPassword;
        let options = this._config.getOptions();

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
                let expireTicks = currentTicks + options.getInteger('codeExpirationTimeout');
                let expireTime = new Date(expireTicks);

                userPassword.pwd_rec_code = this.generateVerificationCode();
                userPassword.pwd_rec_expire = expireTime;

                this._db.updateUserPassword(
                    correlationId,
                    userId,
                    userPassword,
                    callback
                );
            },
        // Asynchronous post-processing
            (callback) => {
                this.logActivity(
                    correlationId,
                    {
                        type: 'password recovered',
                        party: { 
                            id: userId,
                            name: ''  // Todo: Retrieve user account
                        }
                    }
                );

                this.sendEmail(
                    correlationId,
                    userId,
                    {
                        textTemplate: __dirname + '/../../../templates/recover_password.txt',
                        htmlTemplate: __dirname + '/../../../templates/recover_password.html',
                        subjectTemplate: __dirname + '/../../../templates/recover_password_subject.txt',
                        content: {
                            code: userPassword.pwd_rec_code
                        },
                    }
                );

                callback();
            }
        ], (err) => {
            if (callback) callback(err, userPassword);
        });
    }
    
}
