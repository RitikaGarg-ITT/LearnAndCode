import db from "../config/db";
import { Article } from "../models/articles";

export class ArticleReactionRepository {
  static async likeArticle(userId: number, articleId: number) {
    return db.query(
      `
      INSERT INTO article_reactions (user_id, article_id, reaction_type)
      VALUES (?, ?, 'like')
      ON DUPLICATE KEY UPDATE reaction_type = 'like'
    `,
      [userId, articleId]
    );
  }

  static async dislikeArticle(userId: number, articleId: number) {
    return db.query(
      `
      INSERT INTO article_reactions (user_id, article_id, reaction_type)
      VALUES (?, ?, 'dislike')
      ON DUPLICATE KEY UPDATE reaction_type = 'dislike'
    `,
      [userId, articleId]
    );
  }

  static async getArticleReactions(articleIds: number[]) {
    if (!articleIds.length) return [];
    const [rows] = await db.query(
      `SELECT article_id,
              SUM(reaction_type = 'like') AS likes,
              SUM(reaction_type = 'dislike') AS dislikes
         FROM article_reactions
        WHERE article_id IN (?)
        GROUP BY article_id
      `,
      [articleIds]
    );
    return rows as Article[];
  }
}
