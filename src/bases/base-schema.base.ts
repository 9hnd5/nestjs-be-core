import { EntitySchemaColumnOptions } from 'typeorm';
export const BaseSchema = {
    isDeleted: {
        type: Boolean,
        name: 'is_deleted',
        nullable: false,
    } as EntitySchemaColumnOptions,
    createdDate: {
        type: Date,
        name: 'created_date',
        nullable: false,
    } as EntitySchemaColumnOptions,
    createdBy: {
        type: Number,
        name: 'created_by',
        nullable: false,
    } as EntitySchemaColumnOptions,
    modifiedDate: {
        type: Date,
        name: 'modified_date',
        nullable: true,
    } as EntitySchemaColumnOptions,
    modifiedBy: {
        type: Number,
        name: 'modified_by',
        nullable: true,
    } as EntitySchemaColumnOptions,
};
