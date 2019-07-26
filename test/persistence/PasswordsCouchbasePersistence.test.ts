let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { PasswordsCouchbasePersistence } from '../../src/persistence/PasswordsCouchbasePersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

suite('PasswordsCouchbasePersistence', ()=> {
    let persistence: PasswordsCouchbasePersistence;
    let fixture: PasswordsPersistenceFixture;

    setup((done) => {
        let couchbaseUri = process.env['COUCHBASE_SERVICE_URI'];
        let couchbaseHost = process.env['COUCHBASE_SERVICE_HOST'] || 'localhost';
        let couchbasePort = process.env['COUCHBASE_SERVICE_PORT'] || 8091;
        let couchbaseUser = process.env['COUCHBASE_USER'] || 'Administrator';
        let couchbasePass = process.env['COUCHBASE_PASS'] || 'password';
        let couchbaseBucket = process.env['COUCHBASE_BUCKET'] || 'test';
        if (couchbaseUri == null && couchbaseHost == null)
            return;
    
        var dbConfig = ConfigParams.fromTuples(
            'bucket', couchbaseBucket,
            'options.auto_create', true,
            'connection.uri', couchbaseUri,
            'connection.host', couchbaseHost,
            'connection.port', couchbasePort,
            'connection.detailed_errcodes', 1,
            'credential.username', couchbaseUser,
            'credential.password', couchbasePass
        );

        persistence = new PasswordsCouchbasePersistence();
        persistence.configure(dbConfig);

        fixture = new PasswordsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err) {
                done(err);
                return;
            }
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