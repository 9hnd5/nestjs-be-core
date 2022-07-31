import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataSource } from 'typeorm';
import { EXCLUDE_CORE_INTERCEPTOR_KEY } from '~/decorators/exclude-core-interceptor.decorator';
import { SuccessResponse } from '~/models/response.model';

@Injectable()
export class CoreResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse> {
    constructor(private reflector: Reflector, private dataSource: DataSource) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>
    ): Observable<SuccessResponse | any> | Promise<Observable<SuccessResponse | any>> {
        const observable = next.handle();
        return observable.pipe(
            tap({
                error: () => {
                    this.dataSource
                        .destroy()
                        .then()
                        .catch((e) => console.log(e));
                },
                complete: () => {
                    this.dataSource
                        .destroy()
                        .then()
                        .catch((e) => console.log(e));
                },
            }),
            map((data) => {
                const excludeCoreInterceptor = this.reflector.get(EXCLUDE_CORE_INTERCEPTOR_KEY, context.getClass());
                if (excludeCoreInterceptor) return data;
                return new SuccessResponse(data);
            })
        );
    }
}
