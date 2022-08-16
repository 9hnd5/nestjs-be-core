import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IgnoreCoreRes } from '~/decorators/ignore-core-response.decorator';
import { QueryBase } from '~/models/common.model';
import { BusinessException } from '~/models/error.model';

class DTO extends QueryBase {}

@Controller()
@IgnoreCoreRes()
export class AppController {
    constructor() {}

    @Get()
    get(@Query() query: DTO) {
        throw new BusinessException('test');
        return query;
    }

    @Post()
    post(@Body() dto: DTO) {
        return dto;
    }
}
