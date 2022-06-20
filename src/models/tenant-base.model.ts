import { BaseModel } from "src/bases";
import { Column, TableColumns } from "src/decorators";
import { CoreModel } from "./core.model";

@TableColumns(['companyId'])
export class TenantBaseModel {
    @Column('company_id')
    public companyId: number;
}