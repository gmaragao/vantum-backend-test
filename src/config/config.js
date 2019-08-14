module.exports = express => {
  const app = express();
  const mongoose = require('mongoose');
  const port = 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  app.use(express.json());
};
