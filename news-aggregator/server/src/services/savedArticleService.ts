// services/savedArticleService.ts
import savedArticleRepo from "../repositories/savedArticleRepo";
import { SavedArticle } from "../models/savedArticle";

class SavedArticleService {
  // Save an article for a user
  async saveArticle(userId: number, articleId: number): Promise<void> {
    // Optionally, check if already saved to avoid duplicates
    const alreadySaved = await savedArticleRepo.isArticleSaved(userId, articleId);
    if (alreadySaved) {
      throw new Error("Article already saved.");
    }
    await savedArticleRepo.saveArticle(userId, articleId);
  }

  // Get all saved articles for a user
  async getSavedArticles(userId: number): Promise<SavedArticle[]> {
    return await savedArticleRepo.getSavedArticles(userId);
  }

  // Delete a saved article by its saved_article id
  async deleteSavedArticle(savedArticleId: number): Promise<void> {
    await savedArticleRepo.deleteSavedArticle(savedArticleId);
  }
}

export default new SavedArticleService();
