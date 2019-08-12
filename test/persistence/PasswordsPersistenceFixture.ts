let async = require('async');
let assert = require('chai').assert;

import { IPasswordsPersistence } from '../../src/persistence/IPasswordsPersistence';
import { UserPasswordV1 } from '../../src/data/version1/UserPasswordV1';

let USER_PWD = new UserPasswordV1('1', 'password123');

export class PasswordsPersistenceFixture {
    private _persistence: IPasswordsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testCrudOperations(done) {
        async.series([
        // Create user password
            (callback) => {
                this._persistence.create(
                    null,
                    USER_PWD,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);
                        assert.isNotNull(userPassword.password);
                        assert.isFalse(userPassword.locked);

                        callback();
                    }
                );
            },
        // Update the user password
            (callback) => {
                let userPassword = new UserPasswordV1(USER_PWD.id, 'newpwd123');
                userPassword.rec_code = "123";
                userPassword.rec_expire_time = new Date();

                this._persistence.update(
                    null,
                    userPassword,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id)
                        assert.equal(userPassword.password, 'newpwd123');

                        callback();
                    }
                );
            },
            // Get user password
            (callback) => {
                this._persistence.getOneById(
                    null,
                    USER_PWD.id,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id)

                        callback();
                    }
                );
            },
    // Delete the user password
            (callback) => {
                this._persistence.deleteById(
                    null,
                    USER_PWD.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete user
            (callback) => {
                this._persistence.getOneById(
                    null,
                    USER_PWD.id,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isNull(userPassword || null);

                        callback();
                    }
                );
            }
        ], done);
    }

}
