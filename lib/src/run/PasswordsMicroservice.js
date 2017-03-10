"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var PasswordsFactory_1 = require('../build/PasswordsFactory');
/**
 * Passwords microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
var PasswordsMicroservice = (function (_super) {
    __extends(PasswordsMicroservice, _super);
    /**
     * Creates instance of passwords microservice.
     */
    function PasswordsMicroservice() {
        _super.call(this, "pip-services-passwords", PasswordsFactory_1.PasswordsFactory.Instance);
    }
    return PasswordsMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.PasswordsMicroservice = PasswordsMicroservice;
