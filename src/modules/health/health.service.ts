import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '~/modules/http/http.service';

@Injectable()
export class HealthService {
    constructor(private configService: ConfigService, private httpService: HttpService) {}

    get() {
        return {
            status: 'Ok',
            time: new Date(),
            appName: this.configService.get('appName'),
            requestId: this.httpService.scopeVariable.requestId,
        };
    }
}
