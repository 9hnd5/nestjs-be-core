import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isArray } from 'lodash';
import { ErrorResponse } from '~/models/response.model';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        let customException = exception;
        const httpAdapter = this.httpAdapterHost?.httpAdapter;

        //Exception that belong to HttpException
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse() as
                | { statusCode: number; message: string | string[]; error: string }
                | string;

            if (typeof res === 'object' && isArray(res.message)) {
                const { message } = res;
                const customMessage: Record<string, any>[] = [];
                for (const m of message) {
                    const index = m.indexOf(' ');
                    const key = m.substring(0, index);
                    customMessage.push({ [key]: m });
                }
                customException = new HttpException(new ErrorResponse(customMessage), status);
            }

            if (typeof res === 'object' && typeof res.message === 'string') {
                const { message } = res;
                customException = new HttpException(new ErrorResponse(message), status);
            }

            if (typeof res === 'string') {
                customException = new HttpException(new ErrorResponse(res), status);
            }

            super.catch(customException, host);
        }
        //Other exception that unknow
        else {
            httpAdapter!.reply(
                host.switchToHttp().getResponse(),
                new ErrorResponse(exception),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
