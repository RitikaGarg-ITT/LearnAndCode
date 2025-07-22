import savedArticleRepo from "../repositories/savedArticleRepo";
import { SavedArticle } from "../models/savedArticle";

class SavedArticleService {
  async saveArticle(userId: number, articleId: number): Promise<void> {
    const alreadySaved = await savedArticleRepo.isArticleSaved(userId, articleId);
    if (alreadySaved) {
      throw new Error("Article already saved.");
    }
    await savedArticleRepo.saveArticle(userId, articleId);
  }

  async getSavedArticles(userId: number): Promise<SavedArticle[]> {
    return await savedArticleRepo.getSavedArticles(userId);
  }

  async  isArticleAlreadySaved(userId: number, articleId: number): Promise<boolean> {
    const existing = await savedArticleRepo.findByUserAndArticle(userId, articleId);
    return existing !== null;
  }
  async deleteSavedArticle(savedArticleId: number): Promise<void> {
    await savedArticleRepo.deleteSavedArticle(savedArticleId);
  }
}

export default new SavedArticleService();
