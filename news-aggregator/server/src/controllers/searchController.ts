import { Request, Response } from "express";
import userKeywordService from "../services/userKeywordService";
import headlineService from "../services/headlineService";

export class SearchController {
  static async searchByUserKeywords(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const userKeywords = await userKeywordService.getUserKeywords(userId);
    if (!userKeywords.length) return res.json({ headlines: [] });

    // Combine all keywords into a single search query, or search for each keyword
    const allHeadlines: any[] = [];
    for (const kw of userKeywords) {
      const headlines = await headlineService.searchHeadlines(kw.keyword);
      allHeadlines.push(...headlines);
    }
    // Optionally remove duplicates
    res.json({ headlines: allHeadlines });
  }
}
