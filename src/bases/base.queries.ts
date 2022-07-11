import { ScopeVariable } from 'models/common.model';

export class BaseQueries {
    private scopeVariable: ScopeVariable;

    constructor(request: any) {
        this.scopeVariable = request.scopeVariable;
    }
}
