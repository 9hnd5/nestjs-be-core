import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '~/models/response.model';

export class BusinessException extends HttpException {
    constructor(error: string) {
        super(error, HttpStatus.FORBIDDEN);
    }
}

export class NoPermissionException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.FORBIDDEN);
    }
}
