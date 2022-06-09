import { Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../common";

@Injectable({ scope: Scope.REQUEST })
export class HealthService {

    constructor(private configService: ConfigService, private httpService: HttpService) {}

    async get() {
        return {
            status: 'Ok',
            time: new Date(),
            appName: this.configService.get('appName'),
            requestId: this.httpService.scopeVariable.requestId
        }
    }
}