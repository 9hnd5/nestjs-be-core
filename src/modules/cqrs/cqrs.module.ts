import { Module } from '@nestjs/common';
import { Mediator as Mediator1 } from './mediator.service';

@Module({
    imports: [],
    providers: [Mediator1],
    exports: [Mediator1],
})
export class CQRSModule {}
