import { Column } from "typeorm";
import { BaseModel } from "./base.model";

export class TenantBaseModel extends BaseModel {

    @Column({ name: 'company_id', type: 'int', default: -1, nullable: false })
    public companyId: number;
}