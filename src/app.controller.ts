import { Controller, Get } from '@nestjs/common';
import { IgnoreCoreRes } from '~/decorators/ignore-core-response.decorator';

@Controller()
@IgnoreCoreRes()
export class AppController {
    constructor() {}

    @Get()
    get() {
        return { name: 'huy', age: 27 };
    }
}
