import { Request, Response } from "express";
import db from "../config/db";

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      
      const [rows] = await db.query("SELECT name FROM categories ORDER BY name");
      res.json({ categories: (rows as any[]).map((row) => row.name) });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
