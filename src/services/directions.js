var maps = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
});

var cache = {};

module.exports = {
  getLocation: address => {
    return new Promise((resolve, reject) => {
      let cacheKey = address.replace(' ', '');
      if (cache[cacheKey]) {
        return resolve(cache[cacheKey]);
      }
      maps.geocode(
        {
          address,
        },
        (err, response) => {
          if (err) {
            return reject(err);
          }
          cache[cacheKey] = response.json.results;
          resolve(response.json.results);
        },
      );
    });
  },
};
