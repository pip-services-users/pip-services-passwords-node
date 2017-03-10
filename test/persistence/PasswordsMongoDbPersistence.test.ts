import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { PasswordsMongoDbPersistence } from '../../src/persistence/PasswordsMongoDbPersistence';
import { PasswordsPersistenceFixture } from './PasswordsPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('PasswordsMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new PasswordsMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new PasswordsPersistenceFixture(db);

    suiteSetup((done) => {
        db.link(new ComponentSet());
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Basic Operations', (done) => {
        fixture.testBasicOperations(done);
    });

});