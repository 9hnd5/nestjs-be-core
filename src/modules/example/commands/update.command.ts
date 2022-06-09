import { ExampleModel } from "src/modules/shared/models";
import { BaseCommand, BaseCommandHandler } from "src/bases";
import { ExampleRepository } from "src/modules/shared/repositories/example.repository";
import { RequestHandler } from "src/modules/cqrs";

export class UpdateCommand extends BaseCommand<ExampleModel> {
    constructor(
        public data: ExampleModel
    ) { 
        super()
    }
}

@RequestHandler(UpdateCommand)
export class UpdateCommandHandler extends BaseCommandHandler<UpdateCommand, ExampleModel> {
    constructor(private exampleRepository: ExampleRepository) { 
        super()
    }

    async apply(command: UpdateCommand): Promise<ExampleModel> {
        command.data = await this.updateBuild(command.data, command.session);
        return this.exampleRepository.update(command.data);
    }
}