'use strict';
const User = require('../models/User');
module.exports = {
  async index(req, res, next) {
    //INDEX
  },
  async store(req, res, next) {
    const { name, email, phoneNumber, address } = req.body;
    await User.findOne({ email })
      .then(async user => {
        console.log(user);
        if (!user) {
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
              res.status(400);
              res.send(err);
            });
        } else {
          res.status(400);
          res.send({
            error: `Usuário com email ${email} já cadastrado`
          });
        }
      })
      .catch(err => {
        res.status(400);
        res.send(err);
      });
  },
  async show(req, res, next) {
    const { id } = req.params;
    const user = await User.findById(id).catch(err =>
      res.send({ message: 'Id incorreto' })
    );
    if (!user) {
      res.status(400);
      res.send({ message: 'Usuário não encontrado' });
    }
    res.status(200);
    res.send(user);
  },
  async delete(req, res, next) {
    //DELETE
  },
  async update(req, res, next) {
    //UPDATE
  }
};
