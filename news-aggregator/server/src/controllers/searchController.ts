import { Request, Response } from "express";
import userKeywordService from "../services/userKeywordService";
import headlineService from "../services/headlineService";
import { AppError } from "../exceptions/appError";

export class SearchController {
  static async searchByUserKeywords(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        throw new AppError("User not found in request", 401);
      }

      const userKeywords = await userKeywordService.getUserKeywords(userId);
      if (!userKeywords.length) {
        throw new AppError("No keywords configured for this user", 404);
      }

      const allHeadlines: any[] = [];
      for (const kw of userKeywords) {
        const headlines = await headlineService.searchHeadlines(kw.keyword);
        allHeadlines.push(...headlines);
      }

      // Optionally remove duplicates here if needed

      res.json({ headlines: allHeadlines });
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}
