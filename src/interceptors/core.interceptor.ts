import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataSource } from 'typeorm';
import { IGNORE_CORE_RESPONSE_KEY } from '~/decorators/ignore-core-response.decorator';
import { SuccessResponse } from '~/models/response.model';

/**
 * @deprecated consider using CoreResInterceptor import from be-core instead
 */
@Injectable({ scope: Scope.REQUEST })
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
                const ignoreCoreRes = this.reflector.get(IGNORE_CORE_RESPONSE_KEY, context.getClass());
                if (ignoreCoreRes) return data;
                return new SuccessResponse(data);
            })
        );
    }
}
