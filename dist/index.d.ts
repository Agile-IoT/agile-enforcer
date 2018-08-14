import * as express from 'express';
import { Enforcer } from './enforcer';
declare function createHttpServer(): Promise<express.Application>;
export { createHttpServer, Enforcer };
