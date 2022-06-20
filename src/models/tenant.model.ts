import { Column, TableColumns } from "../decorators";

@TableColumns(['companyId'])
export class TenantModel {

    @Column('company_id')
    public companyId: number;
}