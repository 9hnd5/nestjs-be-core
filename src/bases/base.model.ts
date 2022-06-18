import { CoreModel } from "../models"

export class BaseModel extends CoreModel {
    public isDeleted: boolean;
    public createdDate: Date;
    public createdBy: number;
    public modifiedDate: Date;
    public modifiedBy: number;
}