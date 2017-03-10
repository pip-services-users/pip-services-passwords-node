/**
 * @file Passwords seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var PasswordsSenecaPlugin = require('../lib/src/run/PasswordsSenecaPlugin').PasswordsSenecaPlugin;
var plugin = new PasswordsSenecaPlugin();

module.exports = plugin.entry();