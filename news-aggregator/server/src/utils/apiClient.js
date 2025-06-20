const axios = require("axios");

const fetchNews = async (apiUrl, params) => {
  try {
    const response = await axios.get(apiUrl, {
      params: params,
      timeout: 10000,
    });
    return response.data?.articles;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

module.exports = { fetchNews };
