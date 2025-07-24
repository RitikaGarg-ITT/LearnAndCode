import newsService from "../services/newsService";

class NewsController {
  public static async manualFetch(req:any, res:any): Promise<void> {
    try {
      await newsService.fetchAndStoreNews();
      res.status(200).json({ message: "Manual news fetch completed" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default NewsController;
