import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppCommand } from '~/app.command';
import { QueryBase } from '~/models/common.model';
import { Mediator } from '~/modules/cqrs/command';

class DTO extends QueryBase {}

@Controller()
export class AppController {
    constructor(private mediator: Mediator, private commandBus: CommandBus) {}

    @Get()
    async get(@Query() query: DTO) {
        const command = new AppCommand();
        const a = await this.commandBus.execute(command);
        return a;
    }

    @Post()
    post(@Body() dto: DTO) {
        return dto;
    }
}
