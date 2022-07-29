import { ScopeVariable } from '~/models/common.model';

/**
 * @deprecated
 */
export class BaseQueries {
    private scopeVariable: ScopeVariable;

    constructor(request: any) {
        this.scopeVariable = request.scopeVariable;
    }
}
