import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '~/models/response.model';

export class BusinessException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.FORBIDDEN);
    }
}

export class NotFoundException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.BAD_REQUEST);
    }
}

export class ValidationException extends HttpException {
    constructor(error: { [key: string]: string }[]) {
        super(new ErrorResponse(error), HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.UNAUTHORIZED);
    }
}

export class NoPermissionException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.FORBIDDEN);
    }
}
