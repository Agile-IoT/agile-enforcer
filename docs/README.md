
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
const fs = require('fs');
const _ = require('lodash');
const { createHttpServer } = require('./dist');

const swaggerDefinition = fs.readFileSync('./example.swagger.yml');
const config = {
  "origin": "agile-core",
  "methodMap": {
    "deviceStatus": "/device/{deviceId}/status"
  }
}

createHttpServer(swaggerDefinition, config)
.then((app) => {
  app.listen(8008);
  console.log('Listening on port 8008');
})
.catch((err) => {
  console.error('error', err);
  process.exit(1);
});
```

Example HTTP Request:

`GET http://localhost:8008/agile-ui/device/1/status`

Headers:

```javascript
{
  "x-agile-api-method": "deviceStatus", // mapped to /device/{deviceId}/status through config object
  "Authorization": "Bearer 12345" // token to be used for the PDP evaluation call
}
```

Origin: _agile-core_ \-\- mapped to agile-core through config object

Target: _agile-ui_ \-\- first segment of the incoming http request path

EntityId: _1_ \-\- mapped with swagger api definition params

Method: _read_ \-\- http request method GET

Action: _action.status_ \-\- mapped with swagger api definition property "operationId"

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
* [EnforcerError](classes/enforcererror.md)

### Interfaces

* [EnforcerOptions](interfaces/enforceroptions.md)

### Variables

* [agile](#agile)
* [targetMap](#targetmap)

### Functions

* [createHttpServer](#createhttpserver)
* [handler](#handler)

---

## Variables

<a id="agile"></a>

### `<Const>` agile

**● agile**: *`any`* =  agileSDK(config)

*Defined in [enforcer/index.ts:15](https://github.com/Agile-IoT/agile-enforcer/blob/26f7c03/lib/enforcer/index.ts#L15)*

___
<a id="targetmap"></a>

### `<Const>` targetMap

**● targetMap**: *`Map`<`string`, `string`>* =  new Map([
	['agile-ui', 'localhost:8080']
])

*Defined in [routes/enforcer/config.ts:11](https://github.com/Agile-IoT/agile-enforcer/blob/26f7c03/lib/routes/enforcer/config.ts#L11)*

___

## Functions

<a id="createhttpserver"></a>

###  createHttpServer

▸ **createHttpServer**(apiSchema: *`any`*, config: *`any`*): `Promise`<`Application`>

*Defined in [index.ts:18](https://github.com/Agile-IoT/agile-enforcer/blob/26f7c03/lib/index.ts#L18)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| apiSchema | `any` |
| config | `any` |

**Returns:** `Promise`<`Application`>

___
<a id="handler"></a>

###  handler

▸ **handler**(enforcer: *[Enforcer](classes/enforcer.md)*, req: *`express.Request`*, res: *`express.Response`*): `Promise`< `void` &#124; `Response`>

*Defined in [routes/enforcer/index.ts:16](https://github.com/Agile-IoT/agile-enforcer/blob/26f7c03/lib/routes/enforcer/index.ts#L16)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| enforcer | [Enforcer](classes/enforcer.md) |
| req | `express.Request` |
| res | `express.Response` |

**Returns:** `Promise`< `void` &#124; `Response`>

___

