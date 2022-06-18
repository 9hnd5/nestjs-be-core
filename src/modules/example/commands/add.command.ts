import { BaseCommand, BaseCommandHandler } from "../../../bases";
import { BusinessException } from "../../../exceptions";
import { RequestHandler } from "../../cqrs";
import { ExampleModel } from "../../shared/models";
import { ExampleRepository } from "../../shared/repositories/example.repository";

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