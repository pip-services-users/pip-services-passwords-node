let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    logger: {
        level: 'debug'
    },
    persistence: {
        type: 'memory'
    },
    service: {
        connection: {
            protocol: 'none'
        }
    }
};

suite('PasswordsSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/PasswordsSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
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