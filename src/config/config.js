const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { DB_PASSWORD, DB_USER, DB_NAME } = process.env;
async function dbConnection() {
  console.log('Attempting DB connection');
  const db = await mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-bry5q.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    )
    .then(() => console.log('DB up and running'))
    .catch(err => console.log(err));
}
dbConnection();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
module.exports = app;
