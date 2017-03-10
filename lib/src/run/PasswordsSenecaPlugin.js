"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var PasswordsMicroservice_1 = require('./PasswordsMicroservice');
var PasswordsSenecaPlugin = (function (_super) {
    __extends(PasswordsSenecaPlugin, _super);
    function PasswordsSenecaPlugin() {
        _super.call(this, 'passwords', new PasswordsMicroservice_1.PasswordsMicroservice());
    }
    return PasswordsSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.PasswordsSenecaPlugin = PasswordsSenecaPlugin;
