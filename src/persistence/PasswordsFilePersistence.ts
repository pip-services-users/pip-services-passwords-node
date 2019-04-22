import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { PasswordsMemoryPersistence } from './PasswordsMemoryPersistence';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';

export class PasswordsFilePersistence extends PasswordsMemoryPersistence {
	protected _persister: JsonFilePersister<UserPasswordV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<UserPasswordV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}