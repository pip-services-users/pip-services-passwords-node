import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { UserPasswordV1 } from '../data/version1/UserPasswordV1';

export interface IPasswordsPersistence 
    extends IGetter<UserPasswordV1, string>, IWriter<UserPasswordV1, string> {

    getOneById(correlationId: string, userId: string,
        callback: (err: any, item: UserPasswordV1) => void): void;

    create(correlationId: string, item: UserPasswordV1,
        callback: (err: any, item: UserPasswordV1) => void): void;

    update(correlationId: string, item: UserPasswordV1,
        callback: (err: any, item: UserPasswordV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: UserPasswordV1) => void): void;
}
