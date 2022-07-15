import { Module } from '@nestjs/common';
import { CacheModule } from '~/modules/cache/cache.module';
import { SessionService } from '~/modules/session/session.service';
@Module({
    imports: [CacheModule],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule {}
