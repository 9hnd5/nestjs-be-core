import { Column } from "decorators/column.decorator";
import { TableColumns } from "decorators/table.decorator";

@TableColumns(['companyId'])
export class TenantModel {

    @Column('company_id')
    public companyId: number;
}