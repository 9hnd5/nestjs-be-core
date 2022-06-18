import { NOT_PERMISSION_MESSAGE } from '../constants';
import { ErrorResponseModel } from '../models';

export class BusinessException extends ErrorResponseModel {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class NoPermissionException extends BusinessException {
    constructor() {
        super(NOT_PERMISSION_MESSAGE);
    }
}