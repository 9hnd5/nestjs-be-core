import { Injectable, ScopeOptions, Type } from '@nestjs/common';

export abstract class CQRSRequest<T> {}

export abstract class AbstractRequestHandler<TRequest extends CQRSRequest<T>, T> {
    public abstract handle(request: TRequest, req: any): T | Promise<T>;
}

const staticRequestHandlerMap: Map<
    Type<CQRSRequest<any>>,
    Type<AbstractRequestHandler<any, CQRSRequest<any>>>[]
> = new Map();

export function RequestHandler(requestType: Type<CQRSRequest<any>>, scopeOptions?: ScopeOptions): ClassDecorator {
    return (target): void => {
        if (!(target.prototype instanceof AbstractRequestHandler)) {
            throw new Error(`${target.name} is not a request handler, did you extend ${AbstractRequestHandler.name} ?`);
        }
        const requestHandlerTypes = staticRequestHandlerMap.get(requestType) || [];
        staticRequestHandlerMap.set(requestType, [
            ...requestHandlerTypes,
            target as unknown as Type<AbstractRequestHandler<any, CQRSRequest<any>>>,
        ]);

        Injectable(scopeOptions)(target);
    };
}

export function getRequestHandlerType(
    requestType: Type<CQRSRequest<any>>
): Type<AbstractRequestHandler<CQRSRequest<any>, any>>[] {
    return staticRequestHandlerMap.get(requestType) || [];
}
