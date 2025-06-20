const extServerRepo = require("../repositories/extServerRepo");
const articleRepo = require("../repositories/articleRepo");
const apiClient = require("../utils/apiClient");
const categoryRepo = require("../repositories/categoryRepo");

const fetchAndStoreNews = async () => {
  const [activeServers, categories] = await Promise.all([
    extServerRepo.getActiveServers(),
    categoryRepo.getCategories(),
  ]);

  console.log(categories);
  for (const server of activeServers) {
    for (const category of categories) {
      try {
        const params = {
          apiKey: "7315f30213f048fdbdc36b4df5364e3a",
          country: "us",
          category,
        };
        const newsData = await apiClient.fetchNews(server.api_uri, params);
        console.log("newsData", newsData?.length);

        for (const articleData of newsData) {
          if (!(await articleRepo.articleExists(articleData.url))) {
            await articleRepo.createArticle({
              source_id: server.source_id,
              title: articleData.title,
              description: articleData.description,
              content: articleData.content,
              url: articleData.url,
              image_url: articleData.urlToImage,
              category_id: category?.category_id, // Map to category if possible
              published_at: new Date(articleData.publishedAt),
            });
          }
        }

        await extServerRepo.updateLastFetched(server.source_id);
        console.log(`Fetched ${newsData?.length} articles from ${server?.name}`);
      } catch (error) {
        console.error(`Error fetching from ${server.name}:`, error.message);
      }
    }
  }
};

module.exports = { fetchAndStoreNews };
