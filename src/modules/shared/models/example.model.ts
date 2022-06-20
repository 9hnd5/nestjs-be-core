import { BaseModel } from "../../../models/base.model";
import { Column, Table, Key, TableColumns } from "../../../decorators";


@TableColumns(['id','name'])
@Table('icc_example')
export class ExampleModel extends BaseModel {

    @Key()
    @Column('id')
    public id: number;

    @Column('name')
    public name: string;
}