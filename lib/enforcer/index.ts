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
import * as _ from 'lodash';

const agile = agileSDK(config)

export class EnforcerError {
	code: number;
	message: string;
	data?: any;

	constructor({ code, message, data }: { code: number, message: string, data?: any }) {
		this.code = code;
		this.message = message;
		this.data = data;
	}
}

export interface EnforcerOptions {
	apiMethod: string|string[]|undefined;
	req: any;
}

export class Enforcer {
	apiSchema: any;
	config: any;

	constructor(apiSchema: any, config: any) {
		this.apiSchema = apiSchema;
		this.config = config;
	}

	async authorize(options: EnforcerOptions): Promise<boolean> {
		try {
			if (!options.req.headers.authorization) {
				throw new EnforcerError({
					code: 400,
					message: 'Missing authorization header'
				})
			} else if (!options.apiMethod) {
				throw new EnforcerError({
					code: 400,
					message: 'Missing x-agile-api-method header with requested method'
				});
			}

			// Sanitize apiMethod
			if (_.isArray(options.apiMethod)) {
				options.apiMethod = options.apiMethod[0];
			}

			const path = this.config.methodMap[options.apiMethod];

			if (!path) {
				throw new EnforcerError({
					code: 400,
					message: 'Could not find the requested method api path'
				});
			}

			const pathOptions = this.apiSchema.paths[path];

			if (!pathOptions) {
				throw new EnforcerError({
					code: 400,
					message: 'Could not find the requested method api options'
				});
			}

			const params = _.merge(Enforcer.extractOptions(options.req.method.toLowerCase(), options.req.path)(pathOptions, path), {
				origin: this.config.origin
			});
			agile.tokenSet(options.req.token);
			console.log('Checking permissions with params:', params);

			let ack = false;

			if (process.env.ENFORCER_DEV_MODE === 'true') {
				ack = true;
			} else {
				ack = await agile.policies.pdp.evaluate([params]);
			}
			agile.tokenSet('');
			return ack;
		} catch (err) {
			const { response } = err;
			if (err instanceof EnforcerError) {
				throw err;
			} else if (response) {
				throw new EnforcerError({
					code: response.status,
					message: response.statusText,
					data: err
				});
			} else {
				throw new EnforcerError({
					code: 500,
					message: 'Could not check authorization with PDP',
					data: err
				});
			}
		}
	}

	static extractOptions = (reqMethod: string, reqPath: string) => (options: any, path: string) => {
		const reqSegments = _.reject(reqPath.split('/'), _.isEmpty);
		const segments = _.reject(path.split('/'), _.isEmpty);
		const params = _.map(segments, segment => /{\w*}/i.test(segment));
		const entityId = _.head(_.filter(reqSegments, (reqSegment, i) => reqSegment && params[i]));
		if (entityId) {
			return {
				entityId,
				target: segments[0],
				method: reqMethod === 'get' ? 'read' : 'write',
				action: `action.${options[reqMethod].operationId.toLowerCase()}`
			};
		}
		return {
			target: segments[0],
			method: reqMethod === 'get' ? 'read' : 'write',
			action: `action.${options[reqMethod].operationId.toLowerCase()}`
		};
	}
};
