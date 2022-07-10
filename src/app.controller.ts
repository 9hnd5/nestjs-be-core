import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';
import { Authorize } from 'modules/auth/decorators/auth.decorator';

@Controller('app')
export class AppController {
    constructor(private authSerivce: AuthService) {}

    @Get()
    @Authorize('test', 1)
    get() {
        return 'Get method called';
    }

    @Post()
    post() {
        return this.authSerivce.generateToken({ userId: 1 });
    }
}
