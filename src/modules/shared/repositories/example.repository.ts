import { Injectable, Scope } from "@nestjs/common";
import { BaseRepository } from "bases/base.repository";
import { QueriesCreatingService } from "modules/common";
import { ExampleModel } from "../models";

@Injectable({ scope: Scope.TRANSIENT })
export class ExampleRepository extends BaseRepository {
    constructor(private queriesCreatingService: QueriesCreatingService) { 
        super()
    }
    public async add(data: ExampleModel) {
        let query = this.queriesCreatingService.createQueryInsert(data);
        console.log(query)
        return data;
    }

    public async update(data: ExampleModel) {
        let query = this.queriesCreatingService.createQueryUpdate(data);
        console.log(query)
        return data;
    }
}