const driver = require('bigchaindb-driver');

const conf = {
  API_PATH: 'https://test.bigchaindb.com/api/v1/',
};

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
