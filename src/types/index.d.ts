import { ScopeVariable } from '~/models/common.model';

export {};
declare global {
    namespace Express {
        export interface Request {
            scopeVariable: ScopeVariable;
        }
    }
}
