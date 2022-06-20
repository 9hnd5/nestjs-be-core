import { ExampleModel } from "../../shared/models";
import { BaseCommand, BaseCommandHandler } from "../../../bases";
import { ExampleRepository } from "../../shared/repositories/example.repository";
import { RequestHandler } from "../../cqrs";
import { BusinessException } from "../../../../src/exceptions";
import { ExampleQueries } from "../../../../src/modules/shared/queries/example.queries";

export class UpdateCommand extends BaseCommand<ExampleModel> {
    constructor(
        public data: ExampleModel
    ) { 
        super()
    }
}

@RequestHandler(UpdateCommand)
export class UpdateCommandHandler extends BaseCommandHandler<UpdateCommand, ExampleModel> {
    constructor(private exampleRepository: ExampleRepository, private exampleQueries: ExampleQueries) { 
        super()
    }

    public async apply(command: UpdateCommand): Promise<ExampleModel> {
        if (!command.data) {
            throw new BusinessException('Dữ liệu nhập vào không đúng')
        }
        
        let example = await this.exampleQueries.get(command.data.id);

        if (!example) 
        {
            throw new BusinessException('Dữ liệu không tồn tại')
        }
        example.name = command.data.name;
        example = await this.updateBuild(example, command.session);
        return await this.exampleRepository.update(example);
    }
}