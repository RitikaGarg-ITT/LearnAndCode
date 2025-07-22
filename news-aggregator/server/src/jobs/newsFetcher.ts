import cron from "node-cron";
import newsService from "../services/newsService";
import logger from "../utils/logger";

class NewsFetcherScheduler {
  /**
   * Starts the scheduled job to fetch news every 3 hours.
   */
  public static start(): void {
    cron.schedule("0 */3 * * *", async () => {
      logger.info("Starting scheduled news fetch...");
      await newsService.fetchAndStoreNews();
      logger.info("News fetch completed");
    });
  }

  /**
   * Manually triggers a news fetch (for testing).
   */
  public static async test(): Promise<void> {
    logger.info("Starting scheduled news fetch... Task");
    await newsService.fetchAndStoreNews();
    logger.info("News fetch completed");
  }
}

export default NewsFetcherScheduler;
