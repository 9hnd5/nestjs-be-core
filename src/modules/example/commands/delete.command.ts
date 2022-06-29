import { BaseCommand, BaseCommandHandler } from "bases/base.command";
import { RequestHandler } from "modules/cqrs";
import { ExampleModel } from "modules/shared";
import { ExampleQueries } from "modules/shared/queries/example.queries";
import { ExampleRepository } from "modules/shared/repositories/example.repository";

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