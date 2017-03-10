"use strict";
var async = require('async');
var assert = require('chai').assert;
var USER_PWD = {
    id: '1',
    password: 'password123'
};
var PasswordsPersistenceFixture = (function () {
    function PasswordsPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    PasswordsPersistenceFixture.prototype.testBasicOperations = function (done) {
        var _this = this;
        async.series([
            // Create user password
            function (callback) {
                _this._db.createUserPassword(null, USER_PWD, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    assert.isNotNull(userPassword.password);
                    assert.isFalse(userPassword.lock);
                    callback();
                });
            },
            // Update the user password
            function (callback) {
                _this._db.updateUserPassword(null, USER_PWD.id, { password: 'newpwd123' }, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isObject(userPassword);
                    assert.equal(userPassword.id, USER_PWD.id);
                    assert.equal(userPassword.password, 'newpwd123');
                    callback();
                });
            },
            // Delete the user password
            function (callback) {
                _this._db.deleteUserPassword(null, USER_PWD.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete user
            function (callback) {
                _this._db.getUserPasswordById(null, USER_PWD.id, function (err, userPassword) {
                    assert.isNull(err);
                    assert.isNull(userPassword || null);
                    callback();
                });
            }
        ], done);
    };
    return PasswordsPersistenceFixture;
}());
exports.PasswordsPersistenceFixture = PasswordsPersistenceFixture;
