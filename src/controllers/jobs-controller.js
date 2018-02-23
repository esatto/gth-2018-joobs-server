var http = require('../services/http');

var conf = {
  baseurl: 'http://api.arbetsformedlingen.se/af/v0',
  methods: {
    allLan: '/platsannonser/soklista/lan',
    allLanExtended: '/platsannonser/soklista/lan2',
    allYrkesomraden: '/platsannonser/soklista/yrkesomraden',
    kommun: '/platsannonser/soklista/kommuner?lanid=',
    yrkesgrupp: '/platsannonser/soklista/yrkesgrupper?yrkesomradeid=',
    yrke: '/platsannonser/soklista/yrken/:yrkesnamn',
    sok:
      '/platsannonser/matchning?lanid={M}&kommunid={M}&yrkesid={M}nyckelord={M}&sida={V}&antalrader={V}', //{M} mandatory(minst 1), {V} optional
    annons: '/platsannonser/:annonsid',
    annonsLogo: '/platsannonser/:annonsid/logotyp',
  },
};

var csv = (module.exports = {
  index: (req, res) => {
    res.send({ msg: 'hello world' });
  },
  getAllLan: async (req, res) => {
    var data = await http.get(conf.baseurl + conf.methods.allLan);
    res.send(data);
  },
  getAllLanExtended: async (req, res) => {
    var data = await http.get(conf.baseurl + conf.methods.allLanExtended);
    res.send(data);
  },
  getAllYrkesomraden: async (req, res) => {
    var data = await http.get(conf.baseurl + conf.methods.allYrkesomraden);
    res.send(data);
  },
});
