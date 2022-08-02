export class CoreResponse {
    public result: number;
    public data: any;
    public error: any;
}

export class SuccessResponse extends CoreResponse {
    constructor(data: any) {
        super();
        this.result = 0;
        this.data = data;
    }
}

export class ErrorResponse extends CoreResponse {
    constructor(error: any) {
        super();
        this.result = -1;
        this.error = error;
    }
}

export class WarningResponse extends CoreResponse {
    constructor(error: any) {
        super();
        this.result = -2;
        this.error = error;
    }
}
