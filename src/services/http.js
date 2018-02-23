var axios = require('axios');

module.exports = {
  get: async (url, params) => {
    console.log(params);
    var resp = await axios.get(url, {
      params: params,
      headers: {
        'Accept-Language': 'sv',
      },
    });
    return resp.data;
  },
};
