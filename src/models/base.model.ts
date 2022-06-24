import { Column,TableColumns } from "../decorators";
import { CoreModel } from "./core.model";

@TableColumns(['isDeleted','createdDate','createdBy', 'modifiedDate','modifiedBy'])
export class BaseModel extends CoreModel {
    @Column('is_deleted')
    public isDeleted: boolean;
    
    @Column('created_date')
    public createdDate: Date;

    @Column('created_by')
    public createdBy: number;

    @Column('modified_date')
    public modifiedDate: Date;

    @Column('modified_by')
    public modifiedBy: number;
}