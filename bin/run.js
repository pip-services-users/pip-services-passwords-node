/**
 * @file Passwords process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var PasswordsProcessRunner = require('../lib/src/run/PasswordsProcessRunner').PasswordsProcessRunner;

var runner = new PasswordsProcessRunner();
runner.startWithDefaultConfig('../config/config.json');