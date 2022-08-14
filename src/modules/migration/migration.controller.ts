import { Body, Controller, Injectable, Post } from '@nestjs/common';
import AddMigration from '~/modules/migration/dtos/add-migration.dto';
import { MigrationService } from '~/modules/migration/migration.service';

@Controller('/migrations')
export default class MigrationController {
    constructor(private service: MigrationService) {}

    @Post()
    post(@Body() data: AddMigration) {
        return this.service.addMigration(data);
    }
}
