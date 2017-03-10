let _ = require('lodash');
let assert = require('chai').assert;

import { PasswordsSenecaPlugin } from '../../src/run/PasswordsSenecaPlugin';

let buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};


suite('PasswordsSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new PasswordsSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                               
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'passwords',
                cmd: 'authenticate',
                user_id: '1',
                password: 'abc' 
            },
            (err, userPassword) => {
                assert.isNotNull(err);                
                done();
            }
        );
    });
});