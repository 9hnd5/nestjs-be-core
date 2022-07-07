export class CoreResponseModel {
    public result: number;
    public data: any;
    public errorMessage: string | undefined;
}

export class SuccessResponseModel extends CoreResponseModel {
    constructor(data: any) {
        super();
        this.result = 0;
        this.data = data;
    }
}

export class ErrorResponseModel extends CoreResponseModel {
    constructor(message: string | undefined) {
        super();
        this.result = -1;
        this.errorMessage = message;
    }
}

export class WarningResponseModel extends CoreResponseModel {
    constructor(message: string | undefined) {
        super();
        this.result = -2;
        this.errorMessage = message;
    }
}
