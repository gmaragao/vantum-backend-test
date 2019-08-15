const app = require('./config/config');
const port = 3333;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
