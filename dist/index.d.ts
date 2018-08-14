import * as express from 'express';
import { Enforcer } from './enforcer';
declare function createHttpServer(apiSchema: any, config: any): Promise<express.Application>;
export { createHttpServer, Enforcer };
