import { Request, Response } from "express";
import db from "../config/db";

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
        console.log("hellooooooo from category controller" );
      const [rows] = await db.query("SELECT name FROM categories ORDER BY name");
      console.log("rows",rows);
      res.json({ categories: (rows as any[]).map((row) => row.name) });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
