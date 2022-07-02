import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ScopeVariable } from "modules/scope-variable/scope-variable.model";

@Injectable({ scope: Scope.REQUEST })
export class HttpService {
    public scopeVariable!: ScopeVariable;

    constructor(@Inject(REQUEST) req: any) {
        this.scopeVariable = req.scopeVariable
    }
}