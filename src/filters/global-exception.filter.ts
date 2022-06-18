import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    Logger,
} from '@nestjs/common'
import { BusinessException } from '../exceptions';
import { ErrorResponseModel } from '../models';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    private logger = new Logger('GlobalExceptionsFilter')

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        this.logger.error(exception)

        const responseData = 
            exception instanceof BusinessException || 
            Object.getPrototypeOf(Object.getPrototypeOf(exception)).constructor === BusinessException ? 
            exception : 
            new ErrorResponseModel('Đã có lỗi xảy ra. Vui lòng thử lại sau...')

        response.status(200).json(responseData)
    }
}
