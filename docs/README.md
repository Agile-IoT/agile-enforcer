
agile-enforcer
==============

Agile Enforcer API

Install via [npm](https://npmjs.com)
------------------------------------

```console
npm install --save agile-enforcer
```

Use
---

To start `agile-enforcer` as an HTTP server:

```javascript
const enforcer = require(’agile-enforcer’);

const port = Number(process.env.ENFORCER_SERVICE_API_PORT);

enforcer.createHttpServer()
.then((app) => {
  app.listen(port);
  console.log(`Agile Enforcer HTTP APIs running on port ${port}`);
})
.catch((err) => {
  console.error('Something went wrong when starting agile-enforcer server', err);
});
```

Example HTTP Request:

`GET http://localhost:8008/devices/typeof/` Target: _devices_ Method: _read_ (GET) Action: _typeof_

To use `agile-enforcer` as a node module:

```javascript
const { Enforcer } = require(’agile-enforcer’);

const origin = 'agile-ui'
const target = 'devices'
const method = 'read'
const action = 'typeof'

Enforcer.authorize(origin, target, method, action)
.then((response) => {
  console.log('response', response);
})
.catch((err) => {
  console.error('error', err);
});
```

Check the DOCS for further reading: [Documentation](https://github.com/Agile-IoT/agile-enforcer/tree/basic-functions/docs)

## Index

### Classes

* [Enforcer](classes/enforcer.md)

### Variables

* [agile](#agile)
* [originMap](#originmap)
* [targetMap](#targetmap)

### Functions

* [createHttpServer](#createhttpserver)
* [handler](#handler)

### Object literals

* [methodMap](#methodmap)

---

## Variables

<a id="agile"></a>

### `<Const>` agile

**● agile**: *`any`* =  agileSDK(config)

*Defined in [enforcer/index.ts:14](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/enforcer/index.ts#L14)*

___
<a id="originmap"></a>

### `<Const>` originMap

**● originMap**: *`Map`<`string`, `string`>* =  new Map([
	['localhost', 'agile-ui'],
	['localhost:8080', 'agile-ui']
])

*Defined in [routes/enforcer/config.ts:11](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/config.ts#L11)*

___
<a id="targetmap"></a>

### `<Const>` targetMap

**● targetMap**: *`Map`<`string`, `string`>* =  new Map([
	['devices', 'DeviceManager'],
	['device', 'Device'],
	['protocols', 'ProtocolManager'],
	['protocol', 'Protocol']
])

*Defined in [routes/enforcer/config.ts:16](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/config.ts#L16)*

___

## Functions

<a id="createhttpserver"></a>

###  createHttpServer

▸ **createHttpServer**(): `Promise`<`Application`>

*Defined in [index.ts:17](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/index.ts#L17)*

**Returns:** `Promise`<`Application`>

___
<a id="handler"></a>

###  handler

▸ **handler**(enforcer: *[Enforcer](classes/enforcer.md)*, req: *`express.Request`*, res: *`express.Response`*): `Promise`< `void` &#124; `Response`>

*Defined in [routes/enforcer/index.ts:23](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L23)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| enforcer | [Enforcer](classes/enforcer.md) |
| req | `express.Request` |
| res | `express.Response` |

**Returns:** `Promise`< `void` &#124; `Response`>

___

## Object literals

<a id="methodmap"></a>

### `<Const>` methodMap

**methodMap**: *`object`*

*Defined in [routes/enforcer/index.ts:16](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L16)*

<a id="methodmap.delete"></a>

####  DELETE

**● DELETE**: *`string`* = "write"

*Defined in [routes/enforcer/index.ts:20](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L20)*

___
<a id="methodmap.get"></a>

####  GET

**● GET**: *`string`* = "read"

*Defined in [routes/enforcer/index.ts:17](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L17)*

___
<a id="methodmap.post"></a>

####  POST

**● POST**: *`string`* = "write"

*Defined in [routes/enforcer/index.ts:18](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L18)*

___
<a id="methodmap.put"></a>

####  PUT

**● PUT**: *`string`* = "write"

*Defined in [routes/enforcer/index.ts:19](https://github.com/Agile-IoT/agile-enforcer/blob/9dfedaf/lib/routes/enforcer/index.ts#L19)*

___

___

