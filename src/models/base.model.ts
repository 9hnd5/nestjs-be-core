import { Column } from 'typeorm';

export class BaseModel {
    @Column({ name: 'is_deleted', type: 'boolean', nullable: false })
    public isDeleted: boolean;

    @Column({ name: 'created_date', type: 'datetime', nullable: false })
    public createdDate: Date;

    @Column({ name: 'created_by', type: 'int', nullable: false })
    public createdBy: number;

    @Column({ name: 'modified_date', type: 'datetime' })
    public modifiedDate: Date;

    @Column({ name: 'modified_by', type: 'int' })
    public modifiedBy: number;
}
