import { Module } from '@nestjs/common';
import { HttpModule } from 'modules/http/http.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
    imports: [HttpModule.register()],
    controllers: [HealthController],
    providers: [HealthService],
})
export class HealthModule {}
