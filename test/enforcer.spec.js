/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

const assert = require('assert');
const enforcer = require('../dist')

describe('agile-enforcer', () => {
	specify('run module', (done) => {
    enforcer.createHttpServer()
    .then((app) => {
      app.listen(8008);
      console.info('Listening on port 8008');
      assert.ok(true);
      done();
    })
    .catch((err) => {
      assert.ok(false);
      done();
    })
	});
});
