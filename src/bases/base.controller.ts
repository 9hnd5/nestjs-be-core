import { Injectable } from '@nestjs/common';
import { ScopeVariable } from '~/models/common.model';
import { storage } from '~/storage';

@Injectable()
export class BaseController {
    public get scopeVariable(): ScopeVariable {
        const store = storage.getStore()!;
        return store.request.scopeVariable;
    }
}
