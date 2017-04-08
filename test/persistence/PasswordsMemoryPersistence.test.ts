import { PasswordsMemoryPersistence } from '../../src/persistence/PasswordsMemoryPersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

suite('PasswordsMemoryPersistence', ()=> {
    let persistence: PasswordsMemoryPersistence;
    let fixture: PasswordsPersistenceFixture;
    
    setup((done) => {
        persistence = new PasswordsMemoryPersistence();
        fixture = new PasswordsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});