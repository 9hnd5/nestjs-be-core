import { BaseModel } from "../../../bases";
import { Column, Table, Key } from "../../../decorators";

@Table('icc_example')
export class ExampleModel extends BaseModel {

    @Key()
    @Column('id')
    public id: number;

    @Column('name')
    public name: string;
}