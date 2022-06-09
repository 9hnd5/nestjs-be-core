import { Injectable, Scope } from "@nestjs/common";
import { BaseRepository } from "src/bases";
import { ExampleModel } from "../models";

@Injectable({ scope: Scope.TRANSIENT })
export class ExampleRepository extends BaseRepository {
    public async add(data: ExampleModel) {
        return data;
    }

    public update(data: ExampleModel) {
        return data;
    }
}