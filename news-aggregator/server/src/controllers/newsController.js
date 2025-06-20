const newsService = require("../services/newsService");

const manualFetch = async (req, res) => {
  try {
    await newsService.fetchAndStoreNews();
    res.status(200).json({ message: "Manual news fetch completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { manualFetch };
