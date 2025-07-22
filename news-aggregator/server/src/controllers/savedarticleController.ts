import { Request, Response } from "express";
import savedArticleService from "../services/savedArticleService";
import logger from "../utils/logger";

class SavedArticleController {
  static async saveArticle(req: any, res: any) {
    try {
      const { userId, articleId } = req.body;

      if (!userId || !articleId) {
        return res.status(400).json({ message: "Missing userId or articleId." });
      }

      const isAlreadySaved = await savedArticleService.isArticleAlreadySaved(userId, articleId);
      if (isAlreadySaved) {
        return res.status(409).json({ message: "Article already saved." });
      }

      await savedArticleService.saveArticle(userId, articleId);
      res.status(201).json({ message: "Article saved!" });
    } catch (err: any) {
      logger.error("Failed to save article:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getSavedArticles(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const articles = await savedArticleService.getSavedArticles(Number(userId));
      res.status(200).json({ articles });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteSavedArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await savedArticleService.deleteSavedArticle(Number(id));
      res.status(200).json({ message: "Article deleted!" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default SavedArticleController;
