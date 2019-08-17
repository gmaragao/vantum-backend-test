const app = require('./config/config');
const port = 3333;
app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
