/*
 * Copyright (C) 2018 resin.io, and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

export const originMap: Map<string, string> = new Map([
	['localhost', 'agile-ui'],
	['localhost:8080', 'agile-ui']
]);

export const targetMap: Map<string, string> = new Map([
	['devices', 'DeviceManager'],
	['device', 'Device'],
	['protocols', 'ProtocolManager'],
	['protocol', 'Protocol']
]);
