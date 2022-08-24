import { Injectable } from '@nestjs/common';
import { ScopeVariable } from '~/models/common.model';
import { storage } from '~/storage';

@Injectable()
export class BaseController {
    public readonly scopeVariable: ScopeVariable;
    constructor() {
        const store = storage.getStore()!;
        this.scopeVariable = store.request.scopeVariable;
    }
}
