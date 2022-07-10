import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { SuccessResponse } from 'models/response.model';

export class CoreResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>
    ): Observable<SuccessResponse> | Promise<Observable<SuccessResponse>> {
        return next.handle().pipe(map((data) => new SuccessResponse(data)));
    }
}
