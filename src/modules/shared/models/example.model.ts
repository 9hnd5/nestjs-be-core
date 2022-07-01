import { TenantBaseModel } from "models/tenant-base.model";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExampleModel extends TenantBaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column()
    public name: string;
}