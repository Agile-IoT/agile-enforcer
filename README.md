# agile-enforcer

Agile Enforcer API

## Install via [npm](https://npmjs.com)

```console
npm install --save agile-enforcer
```

## Use

To start `agile-enforcer` as an HTTP server:

```javascript
const fs = require('fs');
const _ = require('lodash');
const { createHttpServer } = require('./dist');

const swaggerDefinition = fs.readFileSync('./example.swagger.yml');
const config = {
  "origin": "agile-core",
  "methodMap": {
    "deviceStatus": "/device/{deviceId}/status",
    "devices": "/devices"
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

Origin: *agile-core*

Target: *agile-ui*

EntityId: *1*

Method: *read* (GET)

Action: *action.typeof*

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
