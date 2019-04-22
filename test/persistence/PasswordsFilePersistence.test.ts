import { ConfigParams } from 'pip-services3-commons-node';

import { PasswordsFilePersistence } from '../../src/persistence/PasswordsFilePersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

suite('PasswordsFilePersistence', ()=> {
    let persistence: PasswordsFilePersistence;
    let fixture: PasswordsPersistenceFixture;
    
    setup((done) => {
        persistence = new PasswordsFilePersistence('./data/passwords.test.json');

        fixture = new PasswordsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});