import { ExampleModel } from "../../shared/models";
import { BaseCommand, BaseCommandHandler } from "../../../bases";
import { ExampleRepository } from "../../shared/repositories/example.repository";
import { ExampleQueries } from "../../shared/queries/example.queries";
import { RequestHandler } from "../../cqrs";

export class DeleteCommand extends BaseCommand<ExampleModel> {
    constructor(
        public id: number
    ) { 
        super()
    }
}

@RequestHandler(DeleteCommand)
export class DeleteCommandHandler extends BaseCommandHandler<DeleteCommand, ExampleModel> {
    constructor(private exampleRepository: ExampleRepository, private exampleQueries: ExampleQueries) { 
        super()
    }

    async apply(command: DeleteCommand): Promise<ExampleModel> {
        let data = await this.exampleQueries.get(command.id)
        data = await this.deleteBuild(data, command.session);
        return this.exampleRepository.update(data);
    }
}