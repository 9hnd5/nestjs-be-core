import { EntitySchema } from 'typeorm';
import { Test } from '~/modules/test';

export const testSchema = new EntitySchema<Test>({
    name: 'Test',
    target: Test,
    columns: {
        id: {
            primary: true,
            generated: true,
            type: Number,
        },
    },
});
