import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '~/models/response.model';

export class BusinessException extends HttpException {
    constructor(error: string) {
        super(error, HttpStatus.FORBIDDEN);
    }
}

/**
 * @deprecated use NotFoundException from @nestjs/common instead
 */
export class NotFoundException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.NOT_FOUND);
    }
}
/**
 * @deprecated use BadRequestException from @nestjs/common instead
 */
export class BadRequestException extends HttpException {
    constructor(error: string) {
        super(new ErrorResponse(error), HttpStatus.BAD_REQUEST);
    }
}
/**
 * @deprecated
 */
export class ValidationException extends HttpException {
    constructor(error: { [key: string]: string }[]) {
        super(new ErrorResponse('Validation Exception', error), HttpStatus.BAD_REQUEST);
    }
}
/**
 * @deprecated use UnauthorizedException from @nestjs/common instead
 */
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
