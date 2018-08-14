export declare class EnforcerError {
    code: number;
    message: string;
    data?: any;
    constructor({ code, message, data }: {
        code: number;
        message: string;
        data?: any;
    });
}
export interface EnforcerOptions {
    apiMethod: string | string[] | undefined;
    req: any;
}
export declare class Enforcer {
    apiSchema: any;
    config: any;
    constructor(apiSchema: any, config: any);
    authorize(options: EnforcerOptions): Promise<boolean>;
    static extractOptions: (reqMethod: string, reqPath: string) => (options: any, path: string) => {
        entityId: any;
        target: any;
        method: string;
        action: string;
    } | {
        target: any;
        method: string;
        action: string;
        entityId?: undefined;
    };
}
