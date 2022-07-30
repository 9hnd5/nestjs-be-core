import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataSource } from 'typeorm';
import { SuccessResponse } from '~/models/response.model';

@Injectable()
export class CoreResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse> {
    constructor(private dataSource: DataSource) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>
    ): Observable<SuccessResponse> | Promise<Observable<SuccessResponse>> {
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
                return new SuccessResponse(data);
            })
        );
    }
}
