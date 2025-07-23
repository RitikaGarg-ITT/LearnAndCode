  import { Request, Response } from "express";
  import db from "../config/db";

  export class CategoryController {
    static async getCategories(req: Request, res: Response) {
      try {
        const [rows] = await db.query("SELECT name, is_hidden FROM categories ORDER BY name");
        res.json({ categories: rows });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
  }
