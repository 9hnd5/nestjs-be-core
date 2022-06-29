import { NOT_PERMISSION_MESSAGE } from 'constants/message.constant';
import { ErrorResponseModel } from 'models/core-response.model';

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