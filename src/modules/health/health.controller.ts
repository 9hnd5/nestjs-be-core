import { Controller, Get, Injectable, Scope } from "@nestjs/common";
import { BaseController } from "../../bases";
import { HealthService } from "./health.service";
import { ScopeVariable } from "../scope-variable";
import { ApiTags } from "@nestjs/swagger";

@Controller('health')
@Injectable({ scope: Scope.REQUEST })
@ApiTags('Health')
export class HealthController extends BaseController {

    constructor(
        scopeVariable: ScopeVariable,
        private healthService: HealthService
    ) {
        super(scopeVariable)
    }

    @Get()
    async index() {
        return await this.healthService.get()
    }
}