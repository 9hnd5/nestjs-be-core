import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseController } from '~/bases/base.controller';
import { HealthService } from './health.service';

@Injectable()
@Controller()
export class HealthController extends BaseController {
    constructor(@Inject(REQUEST) request: any, private healthService: HealthService) {
        super(request);
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
