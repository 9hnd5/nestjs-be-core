import { Column } from "decorators/column.decorator";
import { Key } from "decorators/key.decorator";
import { Table, TableColumns } from "decorators/table.decorator";
import { TenantBaseModel } from "models/tenant-base.model";

@TableColumns(['id','name'])
@Table('icc_example')
export class ExampleModel extends TenantBaseModel {

    @Key()
    @Column('id')
    public id: number;

    @Column('name')
    public name: string;
}