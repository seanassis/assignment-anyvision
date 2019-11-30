const axios = require('axios');

const ItunesLimitTermRequestApiUrl = (term, limit) => `https://itunes.apple.com/search?term=${term}&limit=${limit}`;


const getLimitedItunesResults = async (term, limit= 25) => {
      const url = ItunesLimitTermRequestApiUrl(term, limit);

        return axios.get(url, {}, {}).catch(err => {
        console.log("Error in HttpGet", err);
        throw new Error(err);
        });
  }

module.exports = {
  getLimitedItunesResults
}; 