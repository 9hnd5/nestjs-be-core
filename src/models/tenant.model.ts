import { BaseModel } from "src/bases";
import { Column, TableColumns } from "src/decorators";

@TableColumns(['companyId'])
export class TenantModel {

    @Column('company_id')
    public companyId: number;
}