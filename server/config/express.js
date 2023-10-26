const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const routes = require('../routes');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use('/api/', routes);

module.exports = app;
