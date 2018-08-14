export declare class Enforcer {
    authorize(origin: string, target: string, method: string, action: string): Promise<boolean>;
}
