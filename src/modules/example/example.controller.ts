import { Body, Controller, Delete, Get, Injectable, Post, Put, Scope, UseInterceptors, Param, Inject } from "@nestjs/common";
import { BaseController } from "src/bases";
import { ExampleQueries } from "../shared/queries/example.queries";
import { AddCommand, DeleteCommand, UpdateCommand } from "./commands";
import { CoreResponseInterceptor } from "src/interceptors/core.interceptor";
import { BusinessException } from "src/exceptions";
import { Mediator } from "../cqrs";
import { ApiTags } from "@nestjs/swagger";
import { Authorization } from "src/decorators";
import { REQUEST } from "@nestjs/core";
import { Permissions } from "src/constants";

@Controller('/core/v1/example')
@Injectable({ scope: Scope.REQUEST })
@UseInterceptors(CoreResponseInterceptor)
@ApiTags('Example')
export class ExampleController extends BaseController {

    constructor(
        @Inject(REQUEST) httpRequest: any,
        private mediator: Mediator,
        private exampleQueries: ExampleQueries
    ) {
        super(httpRequest)
    }

    @Get(':id')
    @Authorization('exampleManagement', Permissions.View, true)
    async get(@Param('id') id: number) {
        return this.exampleQueries.get(id)
    }

    @Get('')
    @Authorization('exampleManagement', Permissions.View, true)
    async gets() {
        return this.exampleQueries.gets()
    }

    @Post('')
    @Authorization('exampleManagement', Permissions.Insert, true)
    async add(@Body() command: AddCommand) {
        return this.mediator.send(command);
    }

    @Put('')
    @Authorization('exampleManagement', Permissions.Update, true)
    async update(@Body() command: UpdateCommand) {
        return this.mediator.send(command);
    }

    @Delete('')
    @Authorization('exampleManagement', Permissions.Delete)
    async delete(@Body() command: DeleteCommand) {
        return this.mediator.send(new DeleteCommand(command.id));
    }

    @Get('system-error')
    async systemError() {
        throw 'any error'
    }

    @Get('business-error')
    async businessError() {
        throw new BusinessException('business error')
    }
}