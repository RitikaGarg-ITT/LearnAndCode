import db from "../config/db";
import { SearchArticleParams } from "../models/SearchArticleParams";
import logger from "../utils/logger";

export class SearchArticleRepository {
  static async searchArticles({ keyword, startDate, endDate, sortBy }: SearchArticleParams) {
    try {
      let sql = `
  SELECT a.*, 
    COALESCE(SUM(ar.reaction_type = 'like'), 0) AS likes,
    COALESCE(SUM(ar.reaction_type = 'dislike'), 0) AS dislikes
  FROM articles a
  LEFT JOIN article_reactions ar ON a.article_id = ar.article_id
  WHERE (a.title LIKE ? OR a.description LIKE ?)
  AND a.is_hidden = 0
`;

      const params: any[] = [`%${keyword}%`, `%${keyword}%`];

      if (startDate && endDate) {
        sql += " AND a.published_at BETWEEN ? AND ?";
        params.push(startDate, endDate);
      }
      sql += `
        GROUP BY a.article_id
        ORDER BY ${sortBy === "dislikes" ? "dislikes" : "likes"} DESC
      `;
      const [rows] = await db.query(sql, params);
      return rows;
    } catch (error) {
      logger.error("DB Error in searchArticles:", error);
      throw error;
    }
  }
}
