import { ScopeVariable } from '~/models/common.model';

/**
 * @deprecated
 */
export class BaseRepository {
    private scopeVariable: ScopeVariable;

    constructor(request: any) {
        this.scopeVariable = request.scopeVariable;
    }
}
