import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseController } from 'bases/base.controller';
import { HealthService } from './health.service';

@Injectable()
@Controller('health')
export class HealthController extends BaseController {
    constructor(@Inject(REQUEST) request: any, private healthService: HealthService) {
        super(request);
    }
    @Get()
    get() {
        return this.healthService.get();
    }
}
