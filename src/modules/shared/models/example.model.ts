import { BaseModel, TenantBaseModel } from "../../../models";
import { Column, Table, Key, TableColumns } from "../../../decorators";


@TableColumns(['id','name'])
@Table('icc_example')
export class ExampleModel extends TenantBaseModel {

    @Key()
    @Column('id')
    public id: number;

    @Column('name')
    public name: string;
}