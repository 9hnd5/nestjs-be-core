import { ArgumentsHost, Catch, ExceptionFilter as Ex, Logger } from '@nestjs/common';
import {
    BusinessException,
    ServerException,
    ValidationException,
    UnauthorizedException,
    BadRequestException,
    NotFoundException,
} from 'models/error.model';
@Catch()
export class ExceptionsFilter implements Ex {
    private logger = new Logger('ExceptionsFilter');
    catch(exception: Error, host: ArgumentsHost) {
        console.log('exception was throw');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        this.logger.error(JSON.stringify(exception));

        let responseData: any = exception;
        let statusCode = 0;
        if (exception instanceof BusinessException) {
            statusCode = 403;
        } else if (exception instanceof ValidationException || exception instanceof BadRequestException) {
            statusCode = 400;
        } else if (exception instanceof UnauthorizedException) {
            statusCode = 401;
        } else if (exception instanceof NotFoundException) {
            statusCode = 404;
        } else {
            responseData = new ServerException(exception.message);
            statusCode = 500;
        }

        response.status(statusCode).json(responseData);
    }
}
