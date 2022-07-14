import { DynamicModule, Module } from '@nestjs/common';
import { MAIL_OPTION } from 'modules/mail/const';
import { MailService } from 'modules/mail/mail.service';
import { MailOption } from 'modules/mail/type';

@Module({})
export class MailModule {
    static register(option: MailOption): DynamicModule {
        const { isGlobal = false } = option;
        return {
            module: MailModule,
            imports: [],
            providers: [
                MailService,
                {
                    provide: MAIL_OPTION,
                    useValue: option,
                },
            ],
            exports: [MailService],
            global: isGlobal,
        };
    }
}
