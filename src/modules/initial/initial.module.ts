import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from '~/filters/exception.filter';
import { ScopeVariableMiddleWare } from '~/middlewares/scope-variable.middleware';
import { TryConnecDBMiddleware } from '~/middlewares/try-connect-db.middleware';

const exceptionFilter = {
    provide: APP_FILTER,
    useClass: ExceptionsFilter,
};

const validationPipe = {
    provide: APP_PIPE,
    useFactory: () =>
        new ValidationPipe({
            transform: true,
            whitelist: true,
            validationError: {
                target: false,
                value: false,
            },
            stopAtFirstError: true,
        }),
};

@Module({
    imports: [],
    providers: [exceptionFilter, validationPipe],
    exports: [],
})
export class InitialModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ScopeVariableMiddleWare, TryConnecDBMiddleware).forRoutes('*');
    }
}
