import { ArticleReportService } from "../services/articleReportService";
import logger from "../utils/logger";

export class ArticleReportController {
  static async reportArticle(req: any, res: any): Promise<void> {
    try {
      const { articleId, userId, reason } = req.body;

      if (!articleId || !userId || !reason) {
        logger.warn(`Report Article failed: Missing fields from user ${userId}`);
        return res.status(400).json({ error: "articleId, userId, and reason are required" });
      }
      await ArticleReportService.reportArticle(articleId, userId, reason);
      logger.info(`Article ${articleId} reported by user ${userId} for reason: "${reason}"`);
      return res.json({ message: "Article reported successfully!" });
    } catch (err: any) {
      logger.error(`Error reporting article ${req.body?.articleId} by user ${req.body?.userId}: ${err.message || err}`);
      return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }
}
