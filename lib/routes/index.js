/*
 * Copyright (C) 2018 balena.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const _ = require('lodash');

async function handler(enforcer, req, res) {
	try {
		const segments = _.reject(req.path.split('/'), _.isEmpty)
		const target = _.head(segments);
    const targetPath = _.tail(segments);

		const options = {
			req,
			target,
			targetPath
		}

		const ack = await enforcer.authorize(options);
		if (!ack) {
			throw {
				code: 403,
				message: 'UNAUTHORIZED'
			}
		}

    return res.redirect(`http://${target}.local/${targetPath.join('/')}`);
	} catch (err) {
    console.error(err);
		return res.status(err.code).send(err.message || err.data.response.data);
	}
};

module.exports = {
  handler
}
