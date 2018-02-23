var http = require('../services/http');
var fs = require('fs');

var csv = (module.exports = {
  index: (req, res) => {
    res.send({ msg: 'hello world' });
  },
  bolagsverket: async (req, res) => {
    // var data = await http.get(
    //   'http://www.bolagsverket.se/statistik/ftgstat_oppna.csv',
    // );
    // res.send(data.data);
    res.send({ msg: 'hello world' });
  },
});
