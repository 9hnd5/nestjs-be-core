import { Inject, Injectable, InternalServerErrorException, Scope, Type } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { AbstractRequestHandler, CQRSRequest, getRequestHandlerType, RequestHandler } from './cqrs.implement';

@Injectable({ scope: Scope.REQUEST })
export class Mediator {
    public constructor(private moduleRef: ModuleRef, @Inject(REQUEST) private httpRequest: any) {}

    public async send<T, TRequest extends CQRSRequest<T>>(request: TRequest): Promise<T> {
        const requestType = request.constructor as Type<TRequest>;
        const contextId = ContextIdFactory.getByRequest(this.httpRequest);
        const requestHandlerTypes = getRequestHandlerType(requestType);
        // there could be multiple handlers statically registered, but only one can be registered in nestjs container
        const resolvedRequestHandlers: AbstractRequestHandler<T, TRequest>[] = [];
        for (const requestHandlerType of requestHandlerTypes) {
            // MAGIC SAUCE
            const resolvedRequestHandler = await this.moduleRef.resolve(requestHandlerType, contextId, {
                strict: false,
            });
            resolvedRequestHandlers.push(resolvedRequestHandler as any);
        }
        if (resolvedRequestHandlers.length === 0) {
            throw new InternalServerErrorException(
                `No request handler registered for ${requestType.name}, did you apply @${RequestHandler.name}(${requestType.name}) to your request handler?`
            );
        }
        if (resolvedRequestHandlers.length > 1) {
            throw new InternalServerErrorException(
                `Multiple request handlers registered for ${requestType.name}. Only one request handler can be registered per request.`
            );
        }
        return (resolvedRequestHandlers[0].handle as any)(request, this.httpRequest);
    }
}
