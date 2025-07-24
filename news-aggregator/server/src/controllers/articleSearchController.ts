import { Request, Response } from "express";
import { ArticleSearchService } from "../services/articleSearchService";
import { AppError } from "../exceptions/appError";

export class ArticleSearchController {
  static async searchArticles(req: Request, res: Response): Promise<void> {
    try {
      const { keyword, startDate, endDate, sortBy } = req.body;

      if (!keyword) {
        res.status(400).json({ error: "keyword is required" });
        return;
      }

      const articles = await ArticleSearchService.searchArticles({
        keyword,
        startDate,
        endDate,
        sortBy,
      });
      res.json({ articles });
      return;
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      console.error("Internal Server Error during article search:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
