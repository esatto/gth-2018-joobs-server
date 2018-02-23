var axios = require('axios');

var cache = {};

module.exports = {
  get: async (url, params) => {
    console.log({ request: { url, params } });
    var cacheKey = url + ':' + JSON.stringify(params || {});
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    console.log(cacheKey);
    try {
      var resp = await axios.get(url, {
        params,
        headers: {
          'Accept-Language': 'sv',
        },
      });
      cache[cacheKey] = resp.data;
      return resp.data;
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
};
