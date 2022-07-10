import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from 'filters/exception.filter';
import { ScopeVariableMiddleWare } from 'middlewares/scope-variable.middleware';
import { ValidationException } from 'models/error.model';

const exceptionFilter = {
    provide: APP_FILTER,
    useClass: ExceptionsFilter,
};

const validationPipe = {
    provide: APP_PIPE,
    useFactory: () =>
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            exceptionFactory(errors) {
                let e = {};
                for (const { property, constraints } of errors) {
                    const [key, value] = Object.entries(constraints as any)[0];
                    e = { ...e, [property]: value };
                }
                throw new ValidationException(e);
            },
        }),
};

@Module({
    imports: [],
    providers: [exceptionFilter, validationPipe],
    exports: [],
})
export class InitialModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ScopeVariableMiddleWare).forRoutes('*');
    }
}
