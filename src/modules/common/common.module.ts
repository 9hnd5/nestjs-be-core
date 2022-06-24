import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { QueriesCreatingService } from './queries-creating.service';

@Module({
    providers: [
        HttpService,
        QueriesCreatingService
    ],
    exports: [
        HttpService,
        QueriesCreatingService
    ]
})
export class CommonModule {}
