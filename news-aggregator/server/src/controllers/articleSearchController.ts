import { ArticleSearchService } from "../services/articleSearchService";

export class ArticleSearchController {
  static async searchArticles(req: any, res: any): Promise<void> {
    
    const { keyword, startDate, endDate, sortBy } = req.body;
    if (!keyword) return res.status(400).json({ error: "keyword is required" });

    const articles = await ArticleSearchService.searchArticles({
      keyword,
      startDate,
      endDate,
      sortBy,
    });
    return res.json({ articles });
  }
}
