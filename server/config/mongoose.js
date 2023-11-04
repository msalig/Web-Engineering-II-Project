const {mongoose} = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// connect to mongo db
let options = {
  tlsAllowInvalidCertificates: false,
  tlsCertificateKeyFile: `${__dirname}/X509-cert-4442997764144961123.pem`,
  authMechanism: 'MONGODB-X509',
  authSource: '$external'
};
let url = `mongodb+srv://${config.mongoHost}`;

if (config.env === "development") {
  url = `mongodb://localhost:27017/travel-blog`;
  options = {};
}

mongoose.connect(url, options)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log('Database connection error: ' + JSON.stringify(err, undefined, 2));
  });

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
