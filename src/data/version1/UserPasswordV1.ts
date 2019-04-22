import { IStringIdentifiable } from 'pip-services3-commons-node';

export class UserPasswordV1 implements IStringIdentifiable {

    public constructor(id: string, password?: string) {
        this.id = id;
        this.password = password;
        this.locked = false;
        this.fail_count = 0;
    }

    /* Identification */
    public id: string;
    public password: string;

    /* Password management */
    public change_time: Date;
    public locked: boolean;
    public lock_time: Date;
    public fail_count: number;
    public fail_time: Date;
    public rec_code: string;
    public rec_expire_time: Date;

    /* Custom fields */
    custom_hdr: any;
    custom_dat: any;
}