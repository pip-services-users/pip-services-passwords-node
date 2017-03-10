let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { PasswordsLambdaFunction } from '../../src/run/PasswordsLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
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
    }
});

suite('PasswordsLambdaFunction', ()=> {    
    let lambda = new PasswordsLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                role: 'passwords',
                cmd: 'authenticate',
                user_id: '1',
                password: 'abc' 
            },
            {
                done: (err, userPassword) => {
                    assert.isNotNull(err);                
                    done();
                }
            }
        );
    });
});