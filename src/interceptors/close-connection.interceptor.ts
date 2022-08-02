import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataSource } from 'typeorm';

@Injectable()
export class CloseConnectionInterceptor implements NestInterceptor {
    constructor(private dataSource: DataSource) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
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
                return data;
            })
        );
    }
}
