import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { SuccessResponseModel } from 'models/core-response.model';

export class CoreResponseInterceptor<T> implements NestInterceptor<T, SuccessResponseModel> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>
    ): Observable<SuccessResponseModel> | Promise<Observable<SuccessResponseModel>> {
        return next.handle().pipe(map((data) => new SuccessResponseModel(data)));
    }
}
