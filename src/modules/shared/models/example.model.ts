import { BaseModel } from "src/bases";
import { Column, Table, Key } from "src/decorators";

@Table('icc_example')
export class ExampleModel extends BaseModel {

    @Key()
    @Column('id')
    public id: number;

    @Column('name')
    public name: string;
}