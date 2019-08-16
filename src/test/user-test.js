const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const User = require('../models/User');

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
      await request(server)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201);
    });
  });
});
