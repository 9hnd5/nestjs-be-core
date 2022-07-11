import { Module } from '@nestjs/common';
import { CacheModule } from 'modules/cache/cache.module';
import { SessionService } from './session.service';
@Module({
    imports: [CacheModule],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule {}
