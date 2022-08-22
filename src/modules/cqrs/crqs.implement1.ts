/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef, REQUEST } from '@nestjs/core';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { Context, storage } from '~/storage';
import { Session } from '~/models/common.model';

type BaseResult = any;
export abstract class BaseCommand<R extends BaseResult> {
    session: Session;
    #t: R;
}

@Injectable()
export abstract class BaseCommandHandler<
    T extends BaseCommand<BaseResult>,
    R = T extends BaseCommand<infer X> ? X : unknown
> implements ICommandHandler<T, R>
{
    context: Context;
    constructor(private moduleRef: ModuleRef) {
        this.context = storage.getStore()!;
    }
    async execute(command: T): Promise<R> {
        const request = await this.inject(REQUEST);
        command.session = request.scopeVariable.session;
        return this.handle(command);
    }

    abstract handle(command: T): Promise<R>;

    async inject<T = any, R = T>(typeOrToken: Type<T> | Function | string | symbol): Promise<R> {
        return this.moduleRef.resolve(typeOrToken, this.context.ctxId, { strict: false });
    }
}

@Injectable()
export class Mediator {
    constructor(private commandBus: CommandBus) {}

    send<T extends BaseCommand<BaseResult>, R = T extends BaseCommand<infer X> ? X : unknown>(command: T) {
        return this.commandBus.execute<T, R>(command);
    }
}
