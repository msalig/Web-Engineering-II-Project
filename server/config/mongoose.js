const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// DB CONNECTION EVENTS
mongoose.connect(`${config.mongo.host}:${config.mongo.port}/travel-blog`)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log('Database connection error: ' + JSON.stringify(err, undefined, 2));
  });

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
