# agile-enforcer

Agile Enforcer API

## Install via [npm](https://npmjs.com)

```console
npm install --save agile-enforcer
```

## Use

To start `agile-enforcer` as an HTTP server:

```javascript
<<<<<<< HEAD
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
=======
const enforcer = require(’agile-enforcer’);

const port = Number(process.env.ENFORCER_SERVICE_API_PORT);

enforcer.createHttpServer()
.then((app) => {
  app.listen(port);
  console.log(`Agile Enforcer HTTP APIs running on port ${port}`);
})
.catch((err) => {
  console.error('Something went wrong when starting agile-enforcer server', err);
>>>>>>> f8a653ab806640b7a2336cb600c9a7abd799d63d
});
```

Example HTTP Request:

<<<<<<< HEAD
`GET http://localhost:8008/agile-ui/device/1/status`

Origin: *agile-core*

Target: *agile-ui*

EntityId: *1*

Method: *read* (GET)

Action: *action.typeof*
=======
`GET http://localhost:<port>/devices/typeof/`

Origin: *mapped [here](https://github.com/Agile-IoT/agile-enforcer/blob/basic-functions/lib/routes/enforcer/config.ts)*

Target: *devices* *also mapped [here](https://github.com/Agile-IoT/agile-enforcer/blob/basic-functions/lib/routes/enforcer/config.ts)*

Method: *read* (GET)

Action: *typeof*

>>>>>>> f8a653ab806640b7a2336cb600c9a7abd799d63d

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
