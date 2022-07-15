import { Inject, Injectable } from '@nestjs/common';
import { MAIL_OPTION } from 'modules/mail/const';
import { MailOption, MessageOption } from 'modules/mail/type';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(@Inject(MAIL_OPTION) private option: MailOption) {
        const { service = 'gmail', host, port, secure = false, auth } = this.option;
        this.transporter = nodemailer.createTransport({
            service,
            host,
            port,
            secure,
            auth,
        });
    }

    send(messageOption: MessageOption) {
        const { from, to, cc, bcc, subject, text, html, attachments } = messageOption;
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(
                {
                    from: { name: from ?? '', address: this.option.auth.user },
                    to,
                    cc,
                    bcc,
                    subject,
                    text,
                    html,
                    attachments,
                },
                (err, infor) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(infor);
                    }
                }
            );
        });
    }
}
