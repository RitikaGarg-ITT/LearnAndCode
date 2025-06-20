const cron = require("node-cron");
const newsService = require("../services/newsService");

// Runs every 3 hours
cron.schedule("0 */3 * * *", async () => {
  console.log("Starting scheduled news fetch...");
  await newsService.fetchAndStoreNews();
  console.log("News fetch completed");
});

const test = async () => {
  console.log("Starting scheduled news fetch... Task");
  await newsService.fetchAndStoreNews();
  console.log("News fetch completed");
};

// test();
