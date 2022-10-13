import { Body, Controller, Post } from '@nestjs/common';
import { LocalAuthorize } from '~/modules/auth/decorators/local.decorator';
import { Permission } from '~/modules/auth/enums/permission.enum';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationService } from '~/modules/migration/migration.service';

@Controller('/migrations')
export class MigrationController {
    constructor(private service: MigrationService) {}

    @LocalAuthorize('MigrationManagement', Permission.All)
    @Post()
    post(@Body() data: AddMigration) {
        return this.service.addMigration(data);
    }
}
