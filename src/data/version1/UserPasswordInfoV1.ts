import { IStringIdentifiable } from 'pip-services-commons-node';

export class UserPasswordInfoV1 implements IStringIdentifiable {
    public id: string;
    public change_time: Date;
    public locked: boolean;
    public lock_time: Date;
}