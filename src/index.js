const express = require('express');
const config = require('./config');

const home = require('./controllers/home-controller');

const app = express();

app.get('/', home.index);

app.listen(config.port, err => {
  if (err) console.error(err);

  console.log(`Server running on http://localhost:${config.port}`);
});
