const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/vantum', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
module.exports = app;
