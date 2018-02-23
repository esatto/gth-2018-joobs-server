var axios = require('axios');

var cache = {};

module.exports = {
  get: async (url, params) => {
    var cacheKey = url + ':' + JSON.stringify(params);
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    var resp = await axios.get(url, {
      params,
      headers: {
        'Accept-Language': 'sv',
      },
    });
    cache[cacheKey] = resp.data;
    return resp.data;
  },
};
