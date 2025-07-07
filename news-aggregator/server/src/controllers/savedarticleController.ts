// controllers/savedArticleController.ts
import { Request, Response } from "express";
import savedArticleService from "../services/savedArticleService";

class SavedArticleController {
  static async saveArticle(req: Request, res: Response) {
    try {
      const { userId, articleId } = req.body;
      await savedArticleService.saveArticle(userId, articleId);
      res.status(201).json({ message: "Article saved!" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
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
