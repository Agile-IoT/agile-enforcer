/*
 * Copyright (C) 2018 balena.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const agileSDK = require('agile-sdk')
const config = require('./config')
const _ = require('lodash')

const agile = agileSDK(config)

class EnforcerError {
	constructor({ code, message, data }) {
		this.code = code;
		this.message = message;
		this.data = data;
	}
}

class Enforcer {
	constructor(config) {
		this.config = config;
	}

	async authorize(options) {
		try {
			if (!options.req.headers.authorization) {
				throw new EnforcerError({
					code: 400,
					message: 'Missing authorization header'
				})
      }

      const { req } = options

      const api = _.chain(this.config[options.target].calls)
      .map((specs, path) => {
        return {
          specs: specs[_.toLower(req.method)],
          path: _.reject(path.split('/'), _.isEmpty)
        }
      })
      .reject(({ specs }) => _.isUndefined(specs))
      .filter(({ specs, path }) => {
        const pathIndexes = getIndexes(path, isNotParam)
        return path.length === options.targetPath.length
          && isSamePath(path, options.targetPath, pathIndexes)
      })
      .head()
      .value()
      .specs

      const params = {
        entityId: getValue(api.entityId, req),
        entityType: getValue(api.entityType, req),
        field: getValue(api.field, req),
        method: getValue(api.method, req)
      }

			if (!api || _.isEmpty(api)) {
				throw new EnforcerError({
					code: 400,
					message: 'Could not find the requested method api options'
				});
      }

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
				console.error(err);

				throw new EnforcerError({
					code: 500,
					message: 'Could not check authorization with PDP',
					data: err
				});
			}
		}
	}
};

function isParam(segment) {
  return segment.startsWith('{') && segment.endsWith('}')
}

function isNotParam(segment) {
  return !isParam(segment)
}

function getIndexes(path, filter) {
  return _.chain(path)
    .map((segment, i) => filter(segment) && i)
    .filter(_.isInteger)
    .value()
}

function isSamePath(path, targetPath, pathIndexes) {
  return _.reduce(pathIndexes, (acc, curr) => {
    return path[curr] === targetPath[curr]
      && acc
  }, true)
}

function getValue(objPath, req) {
  if (_.isString(objPath)) {
    return objPath
  }
  return _.chain(objPath)
    .map((param) => {
      if (_.isString(param)) {
        return param
      }
      const { path } = param
      const objPathArray = path.split('.')
      const pos = posMap(_.head(objPathArray))
      const rest = _.tail(objPathArray).join('.')
      return _.get(req, `${pos}.${rest}`)
    })
    .value()
    .join('.')
}

function posMap(pos) {
  return {
    'url': 'params',
    'body': 'body',
    'query': 'query'
  }[pos]
}

module.exports = {
  EnforcerError,
  Enforcer
}
