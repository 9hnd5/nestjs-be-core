import { BaseModel } from "src/bases";
import { Column } from "src/decorators";

export class TenantBaseModel {
    @Column('company_id')
    public companyId: number;
}