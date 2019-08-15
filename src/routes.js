module.exports = app => {
  const UserController = require('./controllers/UserController');
  app.get('/', (req, res) => {
    res.send('HELLO WORLD');
  });

  //USER
  app.post('/user', UserController.store);
  app.get('/user/:id', UserController.show);
};
