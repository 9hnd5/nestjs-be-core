import { NOT_PERMISSION_MESSAGE } from '~/constants';
import { ErrorResponse } from './response.model';

export class BusinessException extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

export class NotFoundException extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

export class BadRequestException extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

export class ValidationException extends ErrorResponse {
    constructor(validationError: { [key: string]: string }) {
        super(validationError);
    }
}

export class ServerException extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedException extends ErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

export class NoPermissionException extends BusinessException {
    constructor() {
        super(NOT_PERMISSION_MESSAGE);
    }
}
