export class CoreResponse {
    public result: number;
    public data: any;
    public error: string | Record<string, any>[];
}

export class SuccessResponse extends CoreResponse {
    constructor(data: any) {
        super();
        this.result = 0;
        this.data = data;
    }
}

export class ErrorResponse extends CoreResponse {
    constructor(message: string | Record<string, any>[]) {
        super();
        this.result = -1;
        this.error = message;
    }
}

export class WarningResponse extends CoreResponse {
    constructor(message: string | Record<string, any>[]) {
        super();
        this.result = -2;
        this.error = message;
    }
}
