import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Mediator } from './command';
import { Mediator as Mediator1 } from './mediator.service';

@Module({
    imports: [CqrsModule],
    providers: [Mediator1, Mediator],
    exports: [Mediator1, Mediator],
})
export class CQRSModule {}
