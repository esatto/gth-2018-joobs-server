require('dotenv').config();

const express = require('express');
const config = require('./config');

const home = require('./controllers/home-controller');
const jobs = require('./controllers/jobs-controller');

const app = express();

const router = express.Router();

router.get('/', home.index);
router.get('/jobs/', jobs.index);
router.get('/jobs/allLan', jobs.getAllLan);
router.get('/jobs/allLanExtended', jobs.getAllLanExtended);
router.get('/jobs/allYrkesomraden', jobs.getAllYrkesomraden);

app.use('/api', router);

app.listen(config.port, err => {
  if (err) console.error(err);

  console.log(`Server running on http://localhost:${config.port}`);
});
