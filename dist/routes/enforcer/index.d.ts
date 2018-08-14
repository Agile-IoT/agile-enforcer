import * as express from 'express';
import { Enforcer } from '../../enforcer';
export declare function handler(enforcer: Enforcer, req: express.Request, res: express.Response): Promise<void | import("express-serve-static-core").Response>;
