const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const UserController = require('../controllers/UserController');

describe('User', function() {
  this.beforeAll(async () => {
    mongoose.connect(
      'mongodb://localhost:27017/medicos-de-rua',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      async () => {
        await mongoose.connection.db.dropDatabase(() => {});
      }
    );
  });
  describe('Register a User', function() {
    it('Should create a new User', async () => {
      let user = {
        name: 'Gabriel Aragão',
        email: 'gabriel@gmail.com',
        phoneNumber: '21985708831',
        address: 'Parque Tecnológico de Pelotas'
      };
      user = await new User(user);
      await user.save();
      await request(app)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201);
    });
    it('Should throw an error(incorrect phone number)', async () => {
      let user = {
        name: 'Gabriel Aragão',
        email: 'gabriel@gmail.com',
        phoneNumber: '2198570883',
        address: 'Parque Tecnológico de Pelotas'
      };
      user = await new User(user);
      await user.save();
      await request(app)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect(400);
    });
    it('Should throw an error(repeated email)', async () => {
      let user = {
        name: 'Gabriel Aragão',
        email: 'gabriel@gmail.com',
        phoneNumber: '21985708831',
        address: 'Parque Tecnológico de Pelotas'
      };
      user = await new User(user);
      await user.save();
      await request(app)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert(
            response.body.message,
            'Usuário com email gabriel@gmail.com já cadastrado'
          );
        });
    });
  });
});
