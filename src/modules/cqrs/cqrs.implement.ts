import { Injectable, ScopeOptions, Type } from "@nestjs/common";

export abstract class CQRSRequest<T> {}

export abstract class AbstractRequestHandler<TRequest extends CQRSRequest<T>, T> {
  public abstract handle(request: TRequest): T | Promise<T>;
}

const staticRequestHandlerMap: Map<Type<CQRSRequest<unknown>>, Type<AbstractRequestHandler<unknown, CQRSRequest<unknown>>>[]> = new Map();

export function RequestHandler(requestType: Type<CQRSRequest<unknown>>, scopeOptions?: ScopeOptions): ClassDecorator {
  return (target: Function): void => {
    if (!(target.prototype instanceof AbstractRequestHandler)) {
      throw new Error(`${target.name} is not a request handler, did you extend ${AbstractRequestHandler.name} ?`);
    } 
    const requestHandlerTypes = staticRequestHandlerMap.get(requestType) || [];
    staticRequestHandlerMap.set(requestType, [...requestHandlerTypes, target as Type<AbstractRequestHandler<unknown, CQRSRequest<unknown>>>]);

    Injectable(scopeOptions)(target);
  };
}

export function getRequestHandlerType(requestType: Type<CQRSRequest<unknown>>): Type<AbstractRequestHandler<CQRSRequest<unknown>, unknown>>[] {
  return staticRequestHandlerMap.get(requestType) || [];
}