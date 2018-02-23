const driver = require('bigchaindb-driver');

const conf = {
  API_PATH: 'https://test.bigchaindb.com/api/v1/',
  API_ID: 'a3c2574f',
  API_KEY: '65cdbd574760f8b259fb92f3df3248a8',
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
