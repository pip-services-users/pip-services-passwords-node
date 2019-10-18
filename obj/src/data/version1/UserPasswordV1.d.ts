import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class UserPasswordV1 implements IStringIdentifiable {
    constructor(id: string, password?: string);
    id: string;
    password: string;
    change_time: Date;
    locked: boolean;
    lock_time: Date;
    fail_count: number;
    fail_time: Date;
    rec_code: string;
    rec_expire_time: Date;
    custom_hdr: any;
    custom_dat: any;
}
