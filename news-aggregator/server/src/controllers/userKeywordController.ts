import { Request, Response } from "express";
import userKeywordService from "../services/userKeywordService";
import { AppError } from "../exceptions/appError";

export class UserKeywordController {
  static async getKeywords(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new AppError("User not found in request", 401);

      const keywords = await userKeywordService.getUserKeywords(userId);
      res.json({ keywords });
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  static async addKeyword(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new AppError("User not found in request", 401);

      const { keyword } = req.body;
      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        throw new AppError("Keyword is required and must be a non-empty string", 400);
      }

      await userKeywordService.addKeyword(userId, keyword);
      res.json({ message: "Keyword added." });
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  static async deleteKeyword(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new AppError("User not found in request", 401);

      const { keyword } = req.body;
      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        throw new AppError("Keyword is required and must be a non-empty string", 400);
      }

      await userKeywordService.deleteKeyword(userId, keyword);
      res.json({ message: "Keyword deleted." });
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}
