import { EntitySchemaColumnOptions } from 'typeorm';
import { BaseSchema } from '~/bases/base-schema.base';
export const TenantBaseSchema = {
    companyId: {
        type: Number,
        name: 'company_id',
        default: -1,
        nullable: false,
    } as EntitySchemaColumnOptions,
    ...BaseSchema,
};
