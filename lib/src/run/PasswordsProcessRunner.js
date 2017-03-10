"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var PasswordsMicroservice_1 = require('./PasswordsMicroservice');
/**
 * Passwords process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
var PasswordsProcessRunner = (function (_super) {
    __extends(PasswordsProcessRunner, _super);
    /**
     * Creates instance of passwords process runner
     */
    function PasswordsProcessRunner() {
        _super.call(this, new PasswordsMicroservice_1.PasswordsMicroservice());
    }
    return PasswordsProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.PasswordsProcessRunner = PasswordsProcessRunner;
