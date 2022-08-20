import { REQUEST } from '@nestjs/core';
import { CommandHandler } from '@nestjs/cqrs';
import { BaseCommand, BaseCommandHandler } from '~/modules/cqrs/command';
type R = {
    name: string;
};
export class AppCommand extends BaseCommand<AppCommand> {
    constructor() {
        super();
    }
}

@CommandHandler(AppCommand)
export class AppCommandHandler extends BaseCommandHandler<AppCommand> {
    async handle(command: AppCommand): Promise<AppCommand> {
        this.inject(REQUEST);
        return Promise.resolve(command);
    }
}
