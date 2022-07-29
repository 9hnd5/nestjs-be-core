import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationException } from '~/models/error.model';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof BadRequestException) {
            const { message } = exception.getResponse() as { message: string | string[] };
            if (typeof message !== 'string') {
                const error: Record<string, any>[] = [];
                for (const m of message) {
                    const index = m.indexOf(' ');
                    const key = m.substring(0, index);
                    error.push({ [key]: m });
                }
                response.status(400).json(new ValidationException(error).getResponse());
            }
        }
        super.catch(exception, host);
    }
}
