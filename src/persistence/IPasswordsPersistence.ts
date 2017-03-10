import { IPersistence } from 'pip-services-runtime-node';

export interface IPasswordsPersistence extends IPersistence {
    getUserPasswordById(correlationId: string, userId: string, callback: any);
    createUserPassword(correlationId: string, userPassword: any, callback: any);
    updateUserPassword(correlationId: string, userId: string, userPassword: any, callback: any);
    deleteUserPassword(correlationId: string, userId: string, callback: any);
}
