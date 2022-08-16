import { Inject, Injectable } from '@nestjs/common';
import { migration } from 'src/script';
import { MODULE_OPTIONS_TOKEN } from '~/modules/migration/const';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationOption } from '~/modules/migration/type';

@Injectable()
export class MigrationService {
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private migrationOption: MigrationOption) {}

    async addMigration(data: AddMigration) {
        const { tenantCode } = data;
        const { entities } = this.migrationOption;
        await migration(tenantCode, entities, __dirname);
    }
}
