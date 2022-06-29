import { Body, Controller, Delete, Get, Injectable, Post, Put, Scope, UseInterceptors, Param, Inject } from "@nestjs/common";
import { AddCommand, DeleteCommand, UpdateCommand } from "./commands";
import { ApiTags } from "@nestjs/swagger";
import { REQUEST } from "@nestjs/core";
import { Mediator } from "modules/cqrs";
import { ExampleQueries } from "modules/shared/queries/example.queries";
import { Permissions } from "constants/const";
import { CoreResponseInterceptor } from "interceptors/core.interceptor";
import { BaseController } from "bases/base.controller";
import { Authorization } from "decorators/authorization.decorator";
import { BusinessException } from "exceptions/error.exception";

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