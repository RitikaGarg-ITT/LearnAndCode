// repositories/savedArticleRepo.ts
import db from "../config/db";
import { SavedArticle } from "../models/savedArticle";

class SavedArticleRepo {
  // Save article for user
  async saveArticle(userId: number, articleId: number): Promise<void> {
    await db.query("INSERT INTO saved_articles (user_id, article_id) VALUES (?, ?)", [userId, articleId]);
  }

  // Check if already saved
  async isArticleSaved(userId: number, articleId: number): Promise<boolean> {
    const [rows] = await db.query("SELECT saved_article_id FROM saved_articles WHERE user_id = ? AND article_id = ?", [
      userId,
      articleId,
    ]);
    return Array.isArray(rows) && rows.length > 0;
  }

  // Get all saved articles for user (join to get article details)
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

  // Delete a saved article by its saved_article id
  async deleteSavedArticle(savedArticleId: number): Promise<void> {
    await db.query("DELETE FROM saved_articles WHERE saved_article_id = ?", [savedArticleId]);
  }
}

export default new SavedArticleRepo();
