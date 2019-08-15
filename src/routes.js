module.exports = app => {
  const UserController = require('./controllers/UserController');
  app.get('/', (req, res) => {
    res.send('HELLO WORLD');
  });

  //USER
  app.get('/user', UserController.index);
  app.post('/user', UserController.store);
  app.get('/user/:id', UserController.show);
  app.put('/user/:id', UserController.update);
  app.delete('/user/:id', UserController.delete);
};
