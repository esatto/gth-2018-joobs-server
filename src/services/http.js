var axios = require('axios');

module.exports = {
  get: async url => {
    var resp = await axios.get(url, {
      headers: {
        'Accept-Language': 'sv',
      },
    });
    return resp.data;
  },
};
