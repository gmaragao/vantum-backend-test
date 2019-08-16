'use strict';
const User = require('../models/User');
module.exports = {
  async index(req, res, next) {
    const users = await User.find()
      .sort({ updatedAt: -1, createdAt: -1 })
      .then(async users => {
        console.log(users);
        if (users.length === 0) {
          res.status(200);
          res.send({ message: 'Nenhum usuário cadastrado' });
        }
        res.status(200);
        res.send(users);
      })
      .catch(err => res.send({ message: err }));
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
          //Checking if the phone number is a valid one
          const regexPhone = new RegExp('[0-9]{10,11}');
          if (phoneNumber.match(regexPhone)) {
            await newUser
              .save()
              .then(newUser => {
                res.status(201);
                res.send(newUser);
              })
              .catch(err => {
                res.status(400);
                res.send(err);
              });
          } else {
            res.status(400);
            res.send({
              message:
                'Número de telefone inválido, por favor insira um número válido'
            });
          }
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
