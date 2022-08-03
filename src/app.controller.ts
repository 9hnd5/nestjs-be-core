import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { IgnoreCoreRes } from '~/decorators/ignore-core-response.decorator';

class DTO {
    @IsNotEmpty()
    name: string;
}

@Controller()
@IgnoreCoreRes()
export class AppController {
    constructor() {}

    @Get()
    get() {
        return { name: 'huy', age: 27 };
    }

    @Post()
    post(@Body() dto: DTO) {
        return dto;
    }
}
