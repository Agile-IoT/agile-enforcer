/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import * as express from 'express';
import * as _ from 'lodash';
import { Enforcer } from '../../enforcer';
import { originMap, targetMap } from './config';

const methodMap: any = {
	GET: 'read',
	'POST': 'write',
	'PUT': 'write',
	'DELETE': 'write'
}

export async function handler(enforcer: Enforcer, req: express.Request, res: express.Response) {
	try {
		const pathArray = _.reject(req.path.split('/'), (a) => a === '' || a === 'enforcer');

		const origin: string|undefined = originMap.get(req.hostname);
		const target: string|undefined = pathArray[0];
		const method: string|undefined = methodMap[req.method.toUpperCase()];
		const action: string|undefined = pathArray[1];
		if (!origin || !targetMap.get(target) || !method || !action) {
			throw {
				code: 400,
				message: 'Invalid namespace. Check your URL parameters'
			}
		}
		const ack = await enforcer.authorize(origin, target, method, action);
		if (!ack) {
			throw {
				code: 403,
				message: 'UNAUTHORIZED'
			}
		}
		return res.redirect(`http://${process.env.AGILE_HOST || 'localhost'}:8080/${target}/${action}`);
	} catch (err) {
		return res.status(err.code).json(err);
	}
};
