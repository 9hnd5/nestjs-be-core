import { ExampleModel } from "../../shared/models";
import { BaseCommand, BaseCommandHandler } from "../../../bases";
import { ExampleRepository } from "../../shared/repositories/example.repository";
import { RequestHandler } from "../../cqrs";

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