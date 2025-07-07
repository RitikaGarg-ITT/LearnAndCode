import { Request, Response } from "express";
import userKeywordService from "../services/userKeywordService";
import User from "../models/user";

export class UserKeywordController {
  static async getKeywords(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const keywords = await userKeywordService.getUserKeywords(userId);
    res.json({ keywords });
  }

  static async addKeyword(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const { keyword } = req.body;
    await userKeywordService.addKeyword(userId, keyword);
    res.json({ message: "Keyword added." });
  }

  static async deleteKeyword(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const { keyword } = req.body;
    await userKeywordService.deleteKeyword(userId, keyword);
    res.json({ message: "Keyword deleted." });
  }
}
