import { ExampleModel } from "src/modules/shared/models";
import { BaseCommand, BaseCommandHandler } from "src/bases";
import { ExampleRepository } from "src/modules/shared/repositories/example.repository";
import { ExampleQueries } from "src/modules/shared/queries/example.queries";
import { RequestHandler } from "src/modules/cqrs";

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