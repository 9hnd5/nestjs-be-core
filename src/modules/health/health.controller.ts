import { Controller, Get, Injectable } from '@nestjs/common';
import { BaseController } from '~/bases/base.controller';
import { HealthService } from './health.service';

@Injectable()
@Controller()
export class HealthController extends BaseController {
    constructor(private healthService: HealthService) {
        super();
    }
    @Get('health')
    get() {
        return this.healthService.get();
    }

    @Get('internal/health')
    getInternal() {
        return this.healthService.get();
    }
}
