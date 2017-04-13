import { YamlConfigReader } from 'pip-services-commons-node';

import { PasswordsMongoDbPersistence } from '../../src/persistence/PasswordsMongoDbPersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

suite('PasswordsMongoDbPersistence', ()=> {
    let persistence: PasswordsMongoDbPersistence;
    let fixture: PasswordsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new PasswordsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new PasswordsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});