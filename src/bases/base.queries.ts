import { ScopeVariable } from 'modules/scope-variable/scope-variable.model';

export class BaseQueries {
    private scopeVariable: ScopeVariable;

    protected isJoinTransaction: boolean;

    constructor(request: any) {
        this.scopeVariable = request.scopeVariable;
    }
}
