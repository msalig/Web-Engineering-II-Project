const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const routes = require('../routes');
const passport = require('./passport');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const createError = require('http-errors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

const distDir = '../../dist/frontend';
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

//Cookie and session
app.use(cookieParser());
app.use(session({
  secret: 'this is the secret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new createError.NotFound();
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join('; ');
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message,
  });
  next(err);
});

module.exports = app;
