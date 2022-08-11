import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IgnoreCoreRes } from '~/decorators/ignore-core-response.decorator';
import { QueryBase } from '~/models/common.model';

class DTO extends QueryBase {}

@Controller()
@IgnoreCoreRes()
export class AppController {
    constructor() {}

    @Get()
    get(@Query() query: DTO) {
        return query;
    }

    @Post()
    post(@Body() dto: DTO) {
        return dto;
    }
}
