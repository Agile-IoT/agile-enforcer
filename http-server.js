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
