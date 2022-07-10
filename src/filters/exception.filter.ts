import { ArgumentsHost, Catch, ExceptionFilter as Ex, Logger } from '@nestjs/common';
import { BusinessException, ServerException, ValidationException, UnauthorizedException } from 'models/error.model';
@Catch()
export class ExceptionsFilter implements Ex {
    private logger = new Logger('ExceptionsFilter');

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        this.logger.error(JSON.stringify(exception));

        let responseData: any = exception;
        let statusCode = 0;
        if (exception instanceof BusinessException) {
            statusCode = 403;
        } else if (exception instanceof ValidationException) {
            statusCode = 400;
        } else if (exception instanceof UnauthorizedException) {
            statusCode = 401;
        } else {
            responseData = new ServerException(exception.message);
            statusCode = 500;
        }

        response.status(statusCode).json(responseData);
    }
}
