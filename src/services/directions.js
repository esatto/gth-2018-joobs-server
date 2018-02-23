var maps = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
});

module.exports = {
  getLocation: address => {
    return new Promise((resolve, reject) => {
      maps.geocode(
        {
          address,
        },
        (err, response) => {
          if (err) {
            return reject(err);
          }
          resolve(response.json.results);
        },
      );
    });
  },
};
