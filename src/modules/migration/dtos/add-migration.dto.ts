import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class AddMigration {
    @Expose()
    @IsNotEmpty()
    tenantCode: string;
}
