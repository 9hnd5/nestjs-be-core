import * as asyncHooks from 'async_hooks';
import { Request } from 'express';
export type Context = {
    ctxId: any;
    request: Request;
};
export const storage = new asyncHooks.AsyncLocalStorage<Context>();
