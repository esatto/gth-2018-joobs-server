var http = require('../services/http');

var conf = {
  baseurl: 'http://api.arbetsformedlingen.se/af/v0',
  methods: {
    getAllLan: { url: '/platsannonser/soklista/lan' },
    getAllLanExtended: { url: '/platsannonser/soklista/lan2' },
    getAllYrkesomraden: { url: '/platsannonser/soklista/yrkesomraden' },
    getKommun: {
      url: '/platsannonser/soklista/kommuner',
      params: {
        lanid: { name: 'countyId', mandatory: true },
      },
    },
    getYrkesgrupp: {
      url: '/platsannonser/soklista/yrkesgrupper',
      params: {
        yrkesomradeid: { name: 'workAreaId', mandatory: true },
      },
    },
    getYrke: {
      url: '/platsannonser/soklista/yrken/{yrkesnamn}',
      attribute: {
        yrkesnamn: 'name',
      },
    },
    searchAds: {
      url: '/platsannonser/matchning',
      params: {
        lanid: { name: 'countyId', mandatory: true },
        kommunid: { name: 'municipalyId', mandatory: true },
        yrkesid: { name: 'workId', mandatory: true },
        nyckelord: { name: 'keyword', mandatory: true },
        sida: { name: 'page', mandatory: false },
        antalrader: { name: 'pageSize', mandatory: false },
      },
      comment: 'Only one of the mandatory parameters is needed',
    },
    getAnnons: {
      url: '/platsannonser/{annonsid}',
      attribute: {
        annonsid: 'id',
      },
    },
    getAnnonsLogo: {
      url: '/platsannonser/{annonsid}/logotyp',
      attribute: {
        annonsid: 'id',
      },
    },
  },
};

var getUrl = (method, attr) => {
  let url = conf.baseurl + conf.methods[method].url;
  if (attr) {
    console.log({
      replace: Object.keys(attr)[0],
      value: attr,
    });
    url = url.replace(
      '{' + Object.keys(attr)[0] + '}',
      attr[Object.keys(attr)[0]],
    );
  }
  return url;
};
var toParams = (params, method) => {
  var methodParams = conf.methods[method].params;
  var returnParams = {};
  for (let key in methodParams) {
    let idx = Object.keys(params).indexOf(methodParams[key].name);
    if (idx >= 0) {
      returnParams[key] = params[methodParams[key].name];
    }
  }
  return returnParams;
};

module.exports = {
  index: (req, res) => {
    res.send({ methods: conf.methods });
  },
  getAllLan: async (req, res) => {
    var data = await http.get(getUrl('getAllLan'));
    res.send(data);
  },
  getAllLanExtended: async (req, res) => {
    var data = await http.get(getUrl('getAllLanExtended'));
    res.send(data);
  },
  getAllYrkesomraden: async (req, res) => {
    var url = getUrl('getAllYrkesomraden', { yrkesnamn: req.query.name });
    var data = await http.get(url);
    res.send(data);
  },
  getKommun: async (req, res) => {
    const { countyId } = req.query;

    if (!countyId) {
      return res.status(400).send('Missing mandatory parameter');
    }
    var data = await http.get(
      getUrl('getKommun'),
      toParams({ countyId }, 'getKommun'),
    );
    res.send(data);
  },
  getYrkesgrupp: async (req, res) => {
    const { workAreaId } = req.query;
    if (!workAreaId) {
      return res.status(400).send('Missing mandatory parameter');
    }
    var data = await http.get(
      getUrl('getYrkesgrupp'),
      toParams({ workAreaId }, 'getYrkesgrupp'),
    );
    res.send(data);
  },
  getYrke: async (req, res) => {
    var data = await http.get(getUrl('getYrke'));
    res.send(data);
  },
  getAnnons: async (req, res) => {
    const { annonsid } = req.query;
    var url = getUrl('getAnnons', { annonsid });
    var data = await http.get(url);
    res.send(data);
  },
  getAnnonsLogo: async (req, res) => {
    const { annonsid } = req.query;
    var url = getUrl('getAnnonsLogo', { annonsid });
    var data = await http.get(url);
    res.send(data);
  },
  searchAds: async (req, res) => {
    const { query } = req;

    if (
      !query.countyId &&
      !query.municipalyId &&
      !query.workId &&
      !query.keyword
    ) {
      return res.status(400).send('Missing atleast one mandatory parameter');
    }

    const { matchningslista } = await http.get(
      getUrl('searchAds'),
      toParams(query, 'searchAds'),
    );

    var resp = {
      totalAds: matchningslista.antal_platsannonser,
      numPages: matchningslista.antal_sidor,
      ads: [],
    };

    for (add of matchningslista.matchningdata) {
      let url = getUrl('getAnnons', { annonsid: add.annonsid });
      let logoUrl = getUrl('getAnnonsLogo', { annonsid: add.annonsid });
      let localAd = await http.get(url);
      resp.ads.push({ ...localAd.platsannons, logoUrl });
    }
    res.send(resp);
  },
};
