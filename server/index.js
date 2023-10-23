// config should be imported before importing any other file
const config = require('./config/config');
//const app = require('./config/express');
const express = require("express");
//require('./config/mongoose');
const app = express();
const cors = require('cors');


app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

app.use(cors());
app.use(express.urlencoded({extended: true}));


module.exports = app;


app.get('/api', (req, res) => {

  res.json({'candy': 'bubble-gum'})
  console.log('get request');

})

app.get('/', (req, res) => {
  res.json({'title':'hello'})
  console.log('get request');
});
