import cron from "node-cron";
import newsService from "../services/newsService";

class NewsFetcherScheduler {
  /**
   * Starts the scheduled job to fetch news every 3 hours.
   */
  public static start(): void {
    cron.schedule("0 */3 * * *", async () => {
      console.log("Starting scheduled news fetch...");
      await newsService.fetchAndStoreNews();
      console.log("News fetch completed");
    });
  }

  /**
   * Manually triggers a news fetch (for testing).
   */
  public static async test(): Promise<void> {
    console.log("Starting scheduled news fetch... Task");
    await newsService.fetchAndStoreNews();
    console.log("News fetch completed");
  }
}

export default NewsFetcherScheduler;
