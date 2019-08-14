'use strict';
const User = require('../models/User');
module.exports = {
  async index(req, res, next) {
    //INDEX
  },
  async store(req, res, next) {
    const { name, email, phoneNumber, address } = req.body;
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address
    });
    await newUser
      .save()
      .then(newUser => {
        res.status(200);
        res.send(newUser);
      })
      .catch(err => {
        res.status(err.status);
        res.send(err);
      });
  },
  async show(req, res, next) {
    //SHOW
  },
  async delete(req, res, next) {
    //DELETE
  },
  async update(req, res, next) {
    //UPDATE
  }
};
