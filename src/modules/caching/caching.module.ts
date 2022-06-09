import { Module } from '@nestjs/common';
import { RedisCachingService } from './redis.caching.service';

@Module({
  providers: [
    RedisCachingService
  ],
  exports: [
    RedisCachingService
  ]
})
export class CachingModule { }
