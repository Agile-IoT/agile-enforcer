/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import * as _ from 'lodash';
import * as express from 'express';
import { Enforcer, EnforcerOptions, EnforcerError } from '../../enforcer';
import { targetMap } from './config';

export async function handler(enforcer: Enforcer, req: express.Request, res: express.Response) {
	try {
		const apiMethod: string|string[]|undefined = req.headers['x-agile-api-method'];

		const options: EnforcerOptions = {
			apiMethod,
			req
		}

		const ack = await enforcer.authorize(options);
		if (!ack) {
			throw {
				code: 403,
				message: 'UNAUTHORIZED'
			}
		}

		const target = _.head(_.reject(req.path.split('/'), _.isEmpty));
		const targetPath = _.tail(_.reject(req.path.split('/'), _.isEmpty));
		const targetEndpoint: string|undefined = targetMap.get(target);

		if (!targetEndpoint) {
			throw new EnforcerError({
				code: 400,
				message: 'Invalid target. Check the target in your path'
			});
		}

		return res.redirect(`http://${targetEndpoint}/${targetPath.join('/')}`);
	} catch (err) {
		console.log(JSON.stringify(err));
		return res.status(err.code).json(err);
	}
};
