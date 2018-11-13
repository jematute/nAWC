import { UserModel } from './usermodel';

export class EmailItem {
    public toUserModels: Array<UserModel>;
    public cc: string;
    public subject: string;
    public body: string;
    public attachments: string;
}

