"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var PasswordsRestService = (function (_super) {
    __extends(PasswordsRestService, _super);
    function PasswordsRestService() {
        _super.call(this, PasswordsRestService.Descriptor);
    }
    PasswordsRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-passwords", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    PasswordsRestService.prototype.setPassword = function (req, res) {
        this._logic.setPassword(req.params.correlation_id, req.params.userId || req.params.user_id, req.params.password, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.deletePassword = function (req, res) {
        this._logic.deletePassword(req.params.correlation_id, req.params.userId || req.params.user_id, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.authenticate = function (req, res) {
        this._logic.authenticate(req.params.correlation_id, req.params.userId || req.params.user_id, req.params.password, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.changePassword = function (req, res) {
        this._logic.changePassword(req.params.correlation_id, req.params.userId || req.params.user_id, req.params.old_password || req.params.password, req.params.new_password, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.resetPassword = function (req, res) {
        this._logic.resetPassword(req.params.correlation_id, req.params.userId || req.params.user_id, req.params.password, req.params.code, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.recoverPassword = function (req, res) {
        this._logic.recoverPassword(req.params.correlation_id, req.params.userId || req.params.user_id, this.sendResult(req, res));
    };
    PasswordsRestService.prototype.register = function () {
        this.registerRoute('post', '/passwords', this.setPassword);
        this.registerRoute('del', '/passwords', this.deletePassword);
        this.registerRoute('get', '/passwords/authenticate', this.authenticate);
        this.registerRoute('post', '/passwords/authenticate', this.authenticate);
        this.registerRoute('get', '/passwords/:userId/authenticate', this.authenticate);
        this.registerRoute('post', '/passwords/:userId/authenticate', this.authenticate);
        this.registerRoute('get', '/passwords/change', this.changePassword);
        this.registerRoute('post', '/passwords/change', this.changePassword);
        this.registerRoute('get', '/passwords/:userId/change', this.changePassword);
        this.registerRoute('post', '/passwords/:userId/change', this.changePassword);
        this.registerRoute('get', '/passwords/reset', this.resetPassword);
        this.registerRoute('post', '/passwords/reset', this.resetPassword);
        this.registerRoute('get', '/passwords/:userId/reset', this.resetPassword);
        this.registerRoute('post', '/passwords/:userId/reset', this.resetPassword);
        this.registerRoute('get', '/passwords/recover', this.recoverPassword);
        this.registerRoute('post', '/passwords/recover', this.recoverPassword);
        this.registerRoute('get', '/passwords/:userId/recover', this.recoverPassword);
        this.registerRoute('post', '/passwords/:userId/recover', this.recoverPassword);
        this.registerRoute('del', '/passwords/:userId', this.deletePassword);
    };
    /**
     * Unique descriptor for the PasswordsRestService component
     */
    PasswordsRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-passwords", "rest", "1.0");
    return PasswordsRestService;
}(pip_services_runtime_node_3.RestService));
exports.PasswordsRestService = PasswordsRestService;
