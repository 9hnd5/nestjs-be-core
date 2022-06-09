import { BaseCommand, BaseCommandHandler } from "src/bases";
import { BusinessException } from "src/exceptions";
import { RequestHandler } from "src/modules/cqrs";
import { ExampleModel } from "src/modules/shared/models";
import { ExampleRepository } from "src/modules/shared/repositories/example.repository";

export class AddCommand extends BaseCommand<ExampleModel> {
    constructor(
        public data: ExampleModel
    ) { 
        super()
    }
}

@RequestHandler(AddCommand)
export class AddCommandHandler extends BaseCommandHandler<AddCommand, ExampleModel> {
    constructor(private exampleRepository: ExampleRepository) { 
        super()
    }

    public async apply(command: AddCommand): Promise<ExampleModel> {
        if (!command.data) throw new BusinessException('Dữ liệu không được bỏ trống')
        command.data = await this.createBuild(command.data, command.session);
        return await this.exampleRepository.add(command.data);
    }
}