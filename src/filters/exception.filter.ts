import {
    ArgumentsHost,
    BadRequestException as NestBadRequestException,
    Catch,
    ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import {
    BadRequestException,
    BusinessException,
    NotFoundException,
    UnauthorizedException,
    ValidationException,
} from '~/models/error.model';
@Catch()
export class ExceptionsFilter implements NestExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let responseData: any = exception;
        let statusCode = 0;

        if (exception instanceof NestBadRequestException) {
            const { message } = exception.getResponse() as {
                message: string | string[];
            };
            if (typeof message !== 'string') {
                const error: { [key: string]: any }[] = [];
                for (const m of message) {
                    const index = m.indexOf(' ');
                    const key = m.substring(0, index);
                    error.push({ [key]: m });
                }
                responseData = new ValidationException(error);
            } else {
                responseData = new BadRequestException(message);
            }
            statusCode = 400;
        } else if (exception instanceof BusinessException) {
            statusCode = 403;
        } else if (exception instanceof BadRequestException) {
            statusCode = 400;
        } else if (exception instanceof UnauthorizedException) {
            statusCode = 401;
        } else if (exception instanceof NotFoundException) {
            statusCode = 404;
        }

        response.status(statusCode).json(responseData);
    }
}
