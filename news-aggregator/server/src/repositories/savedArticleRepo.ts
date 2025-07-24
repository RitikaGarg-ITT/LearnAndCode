// repositories/savedArticleRepo.ts
import db from "../config/db";
import { SavedArticle } from "../models/savedArticle";

class SavedArticleRepo {
  async saveArticle(userId: number, articleId: number): Promise<void> {
    await db.query("INSERT INTO saved_articles (user_id, article_id) VALUES (?, ?)", [userId, articleId]);
  }

  async isArticleSaved(userId: number, articleId: number): Promise<boolean> {
    const [rows] = await db.query("SELECT saved_article_id FROM saved_articles WHERE user_id = ? AND article_id = ?", [
      userId,
      articleId,
    ]);
    return Array.isArray(rows) && rows.length > 0;
  }

  async getSavedArticles(userId: number): Promise<SavedArticle[]> {
    const [rows] = await db.query(
      `SELECT sa.saved_article_id as saved_id, a.*
       FROM saved_articles sa
       JOIN articles a ON sa.article_id = a.article_id
       WHERE sa.user_id = ? ORDER BY sa.saved_at DESC`,
      [userId]
    );
    return rows as SavedArticle[];
  }

  async deleteSavedArticle(savedArticleId: number): Promise<void> {
    await db.query("DELETE FROM saved_articles WHERE saved_article_id = ?", [savedArticleId]);
  }

  async findByUserAndArticle(userId: number, articleId: number) {
    const [rows] = await db.query(`SELECT * FROM saved_articles WHERE user_id = ? AND article_id = ?`, [
      userId,
      articleId,
    ]);
    return (rows as any[])[0] || null;
  }
}

export default new SavedArticleRepo();
