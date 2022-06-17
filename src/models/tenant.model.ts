import { Column } from "src/decorators";

export class TenantModel {

    @Column('company_id')
    public companyId: number;
}