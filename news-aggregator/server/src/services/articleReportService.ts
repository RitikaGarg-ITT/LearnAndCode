import { RowDataPacket } from "mysql2";
import db from "../config/db";
import { ArticleReportRepository } from "../repositories/articleReportRepository";

export class ArticleReportService {
  static async reportArticle(article_id: number, user_id: number, reason: string) {
    await ArticleReportRepository.reportArticle(article_id, user_id, reason);
    await ArticleReportService.autoHideArticlesWithReports(article_id);
  }

  static async autoHideArticlesWithReports(article_id: number) {
 
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM article_reports WHERE article_id = ?",
      [article_id]
    );
    const count = (rows[0] as { count: number }).count;

 
    if (count >= 3) {
      await db.query("UPDATE articles SET is_hidden = 1 WHERE article_id = ? AND is_hidden = 0", [article_id]);
    }
  }
}
