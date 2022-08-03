/**
 * @deprecated
 */
export class CoreResponse<T = any> {
    public result: number;
    public data: T;
    public error: any;
}

export interface CoreRes<T = any> {
    result: number;
    data: T;
    error: any;
}

export class SuccessResponse<T = any> implements Omit<CoreRes<T>, 'error'> {
    result: number;
    data: T;
    constructor(data: T) {
        this.result = 0;
        this.data = data;
    }
}

export class ErrorResponse<T = any> implements Omit<CoreRes<T>, 'data'> {
    error: T;
    result: number;
    constructor(error: T) {
        this.result = -1;
        this.error = error;
    }
}

export class WarningResponse<T = any> implements Omit<CoreRes<T>, 'data'> {
    error: T;
    result: number;
    constructor(error: T) {
        this.result = -2;
        this.error = error;
    }
}
