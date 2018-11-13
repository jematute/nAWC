import { userModel } from './usermodel';

export class EmailItem {
    public toUserModels: Array<userModel>;
    public cc: string;
    public subject: string;
    public body: string;
    public attachments: string;
}