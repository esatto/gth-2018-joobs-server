const driver = require('bigchaindb-driver');
const connection = new driver.Connection(process.env.BIGCHAIN_API_PATH, {
  app_id: process.env.BIGCHAIN_API_ID,
  app_key: process.env.BIGCHAIN_API_KEY,
});
module.exports = {
  create: async url => {
    var resp = await axios.get(url, {
      headers: {
        'Accept-Language': 'sv',
      },
    });
    return resp.data;
  },
};
