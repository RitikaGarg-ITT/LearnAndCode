import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class ArticleReportRepository {
  static async reportArticle(article_id: number, user_id: number, reason: string) {
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO article_reports (article_id, user_id, reason) VALUES (?, ?, ?)`,
      [article_id, user_id, reason]
    );
    return result.insertId;
  }
}
