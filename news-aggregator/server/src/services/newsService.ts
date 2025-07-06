import extServerRepo, { Server } from "../repositories/extServerRepo";
import articleRepo, { ArticleInput } from "../repositories/articleRepo";
import apiClient from "../utils/apiClient";
import categoryRepo, { Category } from "../repositories/categoryRepo";

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

class NewsService {
  /**
   * Fetches news from all active servers and stores new articles in the database.
   */
  public static async fetchAndStoreNews(): Promise<void> {
    const [activeServers, categories]: [Server[], Category[]] = await Promise.all([
      extServerRepo.getActiveServers(),
      categoryRepo.getCategories(),
    ]);

    for (const server of activeServers) {
      for (const category of categories) {
        try {
          const params = {
            apiKey: process.env.NEWS_API_KEY || "7315f30213f048fdbdc36b4df5364e3a",
            country: "us",
            category: category.name,
          };

          // Assuming apiClient.fetchNews returns an array of articles
          const newsData: NewsArticle[] = await apiClient.fetchNews(server.api_uri, params);

          for (const articleData of newsData) {
            const exists = await articleRepo.articleExists(articleData.url);

            if (!exists) {
              const article: ArticleInput = {
                source_id: server.source_id,
                title: articleData.title,
                description: articleData.description,
                content: articleData.content,
                url: articleData.url,
                image_url: articleData.urlToImage,
                category_id: category.category_id,
                published_at: new Date(articleData.publishedAt),
              };
              await articleRepo.createArticle(article);
            }
          }

          await extServerRepo.updateLastFetched(server.source_id);
          console.log(`Fetched ${newsData?.length} articles from ${server.name} [${category.name}]`);
        } catch (error: any) {
          console.error(`Error fetching from ${server.name} [${category.name}]:`, error.message);
        }
      }
    }
  }
}

export default NewsService;
