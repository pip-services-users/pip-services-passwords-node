import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { PasswordsFilePersistence } from '../../src/persistence/PasswordsFilePersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/passwords.test.json',
        data: []
    }
});

suite('PasswordsFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new PasswordsFilePersistence();
        db.configure(config);

        fixture = new PasswordsPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('Basic Operations', (done) => {
        fixture.testBasicOperations(done);
    });

});