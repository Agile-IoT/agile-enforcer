/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import * as agileSDK from 'agile-sdk';
import config from './config'

const agile = agileSDK(config)

export class Enforcer {
	async authorize(origin: string, target: string, method: string, action: string): Promise<boolean> {
		try {
			const params = {
				origin,
				target,
				method,
				action: `action.${action}`
			};
			console.log('Checking permissions with params:', params);
			const ack = await agile.policies.pdp.evaluate([params]);
			return ack;
		} catch (err) {
			const { response } = err;
			if (response) {
				throw {
					code: response.status,
					message: response.statusText
				}
			} else {
				throw {
					code: 500,
					message: 'Something went wrong when evaluating with PDP',
					err
				};
			}
		}
	}
};
