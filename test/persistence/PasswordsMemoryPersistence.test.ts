import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { PasswordsMemoryPersistence } from '../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

suite('PasswordsMemoryPersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new PasswordsMemoryPersistence();
        db.configure(new ComponentConfig());
        
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