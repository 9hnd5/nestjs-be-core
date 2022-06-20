import { BaseModel } from "../bases";
import { Column, TableColumns } from "../decorators";

@TableColumns(['companyId'])
export class TenantBaseModel extends BaseModel {
    @Column('company_id')
    public companyId: number;
}