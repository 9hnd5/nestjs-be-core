import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
    constructor(private configService: ConfigService) {}

    get() {
        return {
            status: 'Ok',
            time: new Date(),
            appName: this.configService.get('appName'),
        };
    }
}
