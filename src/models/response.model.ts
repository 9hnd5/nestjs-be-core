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
    error?: any;
    errorMessage: string;
}

export class SuccessResponse<T = any> implements Omit<CoreRes<T>, 'error' | 'errorMessage'> {
    result: number;
    data: T;
    constructor(data: T) {
        this.result = 0;
        this.data = data;
    }
}

export class ErrorResponse<T = any> implements Omit<CoreRes<T>, 'data'> {
    errorMessage: string;
    error?: any;
    result: number;
    constructor(errorMessage: string, error?: any) {
        this.result = -1;
        this.error = error;
        this.errorMessage = errorMessage;
    }
}

export class WarningResponse<T = any> implements Omit<CoreRes<T>, 'data'> {
    errorMessage: string;
    error: any;
    result: number;
    constructor(error: any) {
        this.result = -2;
        this.error = error;
        this.errorMessage;
    }
}
