const fs = require('fs');
const _ = require('lodash');
const { createHttpServer } = require('./lib');

const config = fs.readFileSync('./example.swagger.config.yml');

createHttpServer(config)
.then((app) => {
  app.listen(8008);
  console.log('Listening on port 8008');
  // process.exit(0);
})
.catch((err) => {
  console.error('error', err);
  process.exit(1);
});
