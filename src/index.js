require('dotenv').config();

const express = require('express');
const config = require('./config');

const home = require('./controllers/home-controller');

const app = express();

const router = express.Router();

router.get('/', home.index);

app.use('/api', router);

app.listen(config.port, err => {
  if (err) console.error(err);

  console.log(`Server running on http://localhost:${config.port}`);
});
