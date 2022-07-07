import { Controller, Get, Injectable, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'bases/base.controller';
import { ScopeVariable } from 'modules/scope-variable/scope-variable.model';
import { HealthService } from './health.service';

@Controller('health')
@Injectable({ scope: Scope.REQUEST })
@ApiTags('Health')
export class HealthController extends BaseController {
    constructor(scopeVariable: ScopeVariable, private healthService: HealthService) {
        super(scopeVariable);
    }

    @Get()
    index() {
        return this.healthService.get();
    }
}
