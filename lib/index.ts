/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as bearerToken from 'express-bearer-token';
import { Enforcer } from './enforcer';
import { handler as routeHandler } from './routes/enforcer';
import * as yml from 'js-yaml';

async function createHttpServer(apiSchema: any, config: any) {
	const ymlSchema = yml.load(apiSchema);
	const app: express.Application = express();
	app.use(bearerToken());
	app.use(bodyParser.json());
	const enforcer = new Enforcer(ymlSchema, config);
	app.use(routeHandler.bind(routeHandler, enforcer))
	return app;
}

export {
	createHttpServer,
	Enforcer
};
