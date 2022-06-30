import { Column } from "decorators/column.decorator";
import { TableColumns } from "decorators/table.decorator";
import { BaseModel } from "./base.model";

@TableColumns(['companyId'])
export class TenantBaseModel extends BaseModel {
    @Column('company_id')
    public companyId: number;
}