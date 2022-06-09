import { Injectable, Scope } from "@nestjs/common";
import { BaseQueries } from "src/bases/base.queries";
import { ExampleModel } from "../models";

@Injectable({ scope: Scope.TRANSIENT })
export class ExampleQueries extends BaseQueries {
    public async get(id: number) {
        const data = new ExampleModel()
        data.id = id;
        data.name = `Example ${id}`
        return data;
    }

    public async gets() {
        const data = new ExampleModel()
        data.id = 1;
        data.name = `Example 1`
        return [
            data
        ]
    }
}