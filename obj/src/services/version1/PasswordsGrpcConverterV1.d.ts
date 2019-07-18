import { UserPasswordInfoV1 } from '../../data/version1/UserPasswordInfoV1';
export declare class PasswordsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    static fromPasswordInfo(info: UserPasswordInfoV1): any;
    static toPasswordInfo(obj: any): UserPasswordInfoV1;
}
