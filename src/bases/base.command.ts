import { Request } from 'express';
import { storage } from '~/storage';
import { Base, ScopeVariable, Session } from '~/models/common.model';
import { AbstractRequestHandler, CQRSRequest } from '~/modules/cqrs/cqrs.implement';

export type BaseResult = any;
export class BaseCommand<T = BaseResult> extends CQRSRequest<T> {
    scopeVariable: ScopeVariable;
}

export abstract class BaseCommandHandler<
    T extends BaseCommand<BaseResult>,
    R = T extends BaseCommand<infer X> ? X : unknown
> extends AbstractRequestHandler<T, R> {
    async handle(command: T, request: Request): Promise<R> {
        command.scopeVariable = request.scopeVariable;
        return this.apply(command);
    }

    get scopeVariable() {
        const {
            request: { scopeVariable },
        } = storage.getStore()!;
        return scopeVariable;
    }
    set scopeVariable(values: Record<string, any>) {
        const { request } = storage.getStore()!;
        for (const [key, value] of Object.entries(values)) {
            request.scopeVariable[key] = value;
        }
    }

    abstract apply(command: T): Promise<R>;

    /**
     * @deprecated
     */
    createBuild<T extends Base>(data: T, session: Session) {
        data.createdDate = new Date();
        if (typeof session?.userId === 'number') {
            data.createdBy = session?.userId || 0;
        }
        data.isDeleted = false;
        return data;
    }

    /**
     * @deprecated
     */
    updateBuild<T extends Base>(data: T, session: Session) {
        data.modifiedDate = new Date();
        if (typeof session?.userId === 'number') {
            data.modifiedBy = session?.userId || 0;
        }
        data.isDeleted = false;
        return data;
    }

    /**
     * @deprecated
     */
    deleteBuild<T extends Base>(data: T, session: Session) {
        data.modifiedDate = new Date();
        if (typeof session?.userId === 'number') {
            data.modifiedBy = session?.userId || 0;
        }
        data.isDeleted = true;
        return data;
    }
}
