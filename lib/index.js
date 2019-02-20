/*
 * Copyright (C) 2018 balena.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const _ = require('lodash')
const bodyParser = require('body-parser');
const express = require('express');
const bearerToken = require('express-bearer-token');
const { Enforcer } = require('./enforcer');
const { handler } = require('./routes');
const yml = require('js-yaml');

// create HTTP server with enforcer specs
async function createHttpServer(ymlSpecs) {
  const config = yml.load(ymlSpecs);
	const app = express();
	app.use(bearerToken());
	app.use(bodyParser.json());
	const enforcer = new Enforcer(config);
  buildRoutes(app, config, enforcer)
	return app;
}

function buildRoutes(app, specs, enforcer) {
  _.each(specs, (service, name) => {
    _.each(service.calls, (call, path) => {
      _.each(call, (options, method) => {
        const ePath = path.replace(/{/g, ':').replace(/}/g, '')
        app[_.toLower(method)](`/${name}${ePath}`, handler.bind(handler, enforcer))
      })
    })
  })
}

module.exports = {
  Enforcer,
  createHttpServer
};
