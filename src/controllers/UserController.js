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
    const user = await User.findById(id).catch(err => {
      res.status(400);
      res.send({ message: 'Id no formato incorreto' });
    });
    if (!user) {
      res.status(400);
      res.send({ message: 'Usuário não encontrado' });
    }
    res.status(200);
    res.send(user);
  },
  async delete(req, res, next) {
    const { id } = req.params;
    const user = await User.findById(id).catch(err => {
      res.status(400);
      res.send({ message: 'Id no formato incorreto' });
    });
    if (!user) {
      res.status(400);
      res.send({ message: 'Usuário não encontrado' });
    }
    await User.findByIdAndDelete(id).catch(err => {
      res.status(400);
      res.send({ message: err });
    });
    res.status(200);
    res.send({ message: 'Usuário deletado com sucesso' });
  },
  async update(req, res, next) {
    const { id } = req.params;
    const updatedUser = {};

    //Just updating if fields are not null
    if (req.body.name) updatedUser.name = req.body.name;
    if (req.body.phoneNumber) updatedUser.phoneNumber = req.body.phoneNumber;
    if (req.body.address) updatedUser.address = req.body.address;
    if (req.body.email) updatedUser.email = req.body.email;
    const user = await User.findOneAndUpdate({ _id: id }, updatedUser, {
      new: true
    }).catch(err => {
      res.status(400);
      res.send({
        message: 'Id no formato incorreto ou usuário não encontrado'
      });
    });
    res.status(200);
    res.send(user);
  }
};
