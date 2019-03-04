const fs = require('fs');
const _ = require('lodash');
const { createHttpServer } = require('./lib');
const enforcer_port = parseInt(process.env.ENFORCER_PORT || 80, 10)
const config = fs.readFileSync('./example.swagger.config.yml');

createHttpServer(config)
.then((app) => {
  app.listen(enforcer_port);
  console.log('Listening on port ' + enforcer_port);
  // process.exit(0);
})
.catch((err) => {
  console.error('error', err);
  process.exit(1);
});
