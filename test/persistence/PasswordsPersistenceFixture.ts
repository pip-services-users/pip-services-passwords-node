let async = require('async');
let assert = require('chai').assert;

import { IPasswordsPersistence } from '../../src/persistence/IPasswordsPersistence';

let USER_PWD = {
    id: '1',
    password: 'password123'
};

export class PasswordsPersistenceFixture {
    private _db: IPasswordsPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    testBasicOperations(done) {
        async.series([
        // Create user password
            (callback) => {
                this._db.createUserPassword(
                    null,
                    USER_PWD,
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id);
                        assert.isNotNull(userPassword.password);
                        assert.isFalse(userPassword.lock);

                        callback();
                    }
                );
            },
        // Update the user password
            (callback) => {
                this._db.updateUserPassword(
                    null,
                    USER_PWD.id,
                    { password: 'newpwd123' },
                    (err, userPassword) => {
                        assert.isNull(err);
                        
                        assert.isObject(userPassword);
                        assert.equal(userPassword.id, USER_PWD.id)
                        assert.equal(userPassword.password, 'newpwd123');

                        callback();
                    }
                );
            },
        // Delete the user password
            (callback) => {
                this._db.deleteUserPassword(
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
                this._db.getUserPasswordById(
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
