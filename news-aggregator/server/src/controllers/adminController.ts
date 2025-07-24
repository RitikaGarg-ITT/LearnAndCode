import { Request, Response } from "express";
import { ExternalServerRepository } from "../repositories/ExternalServerRepository";
import db from "../config/db";
import logger from "../utils/logger";
import { RowDataPacket } from "mysql2";

export class AdminController {
  static async listExternalServers(req: any, res: any) {
    try {
      const servers = await ExternalServerRepository.getAll();
      res.json({ servers });
    } catch (err: any) {
      logger.error("Error listing external servers:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  static async getExternalServerDetails(req: any, res: any) {
    try {
      const id = Number(req.params.id);
      const server = await ExternalServerRepository.getById(id);
      if (!server) {
        return res.status(404).json({ error: "Server not found" });
      }
      res.json({ server });
    } catch (err: any) {
      logger.error("Error getting external server details:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  static async updateExternalServer(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { apiKey } = req.body;
      await ExternalServerRepository.updateApiKey(id, apiKey);
      res.json({ message: "API key updated" });
    } catch (err: any) {
      logger.error("Error updating external server:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  static async addCategory(req: any, res: any) {
    try {
      const { name } = req.body;
      await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
      res.json({ message: "Category added" });
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Category already exists" });
      }
      logger.error("Error adding category:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }
  static async addServer(req: any, res: any) {
    try {
      const { name, api_uri, api_key } = req.body;
      if (!name || !api_uri || !api_key) {
        return res.status(400).json({ error: "name, api_uri, and api_key are required" });
      }
      await ExternalServerRepository.addServer({ name, api_uri, api_key });
      res.json({ message: "External server added" });
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "External server already exists" });
      }
      logger.error("Error adding external server:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  static async toggleArticleVisibility(req: Request, res: Response) {
    try {
      const { articleId } = req.params;
      const { is_hidden } = req.body;

      await db.query("UPDATE articles SET is_hidden = ? WHERE article_id = ?", [is_hidden ? 1 : 0, articleId]);

      res.json({ message: `Article ${is_hidden ? "hidden" : "unhidden"} successfully.` });
      logger.info({ message: `Article ${is_hidden ? "hidden" : "unhidden"} successfully. articleID : ${articleId}` });
    } catch (err: any) {
      logger.error("Error toggling article visibility:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  static async toggleCategoryVisibility(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const { is_hidden } = req.body;

      await db.query("UPDATE categories SET is_hidden = ? WHERE category_id = ?", [is_hidden ? 1 : 0, categoryId]);

      res.json({ message: `Category ${is_hidden ? "hidden" : "unhidden"} successfully.` });
    } catch (err: any) {
      logger.error("Error toggling category visibility:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  }


  static async addBlockedKeyword(req: any, res: any) {
    const { keyword } = req.body;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({ message: "Keyword must be a string." });
    }

    try {
      await db.query("INSERT INTO blocked_keywords (keyword) VALUES (?)", [keyword]);
      res.json({ message: `Keyword "${keyword}" blocked.` });
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Keyword already blocked." });
      }
      res.status(500).json({ message: err.message });
    }
  }


  static async removeBlockedKeyword(req: any, res: any) {
    const { keyword } = req.params;
    try {
      const [result]: any = await db.query("DELETE FROM blocked_keywords WHERE keyword = ?", [keyword]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Keyword not found." });
      }
      res.json({ message: `Keyword "${keyword}" unblocked.` });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

 
  static async listBlockedKeywords(req: any, res: any) {
    try {
      const [rows] = await db.query<RowDataPacket[]>("SELECT keyword FROM blocked_keywords");
      res.json({ keywords: rows.map((r: any) => r.keyword) });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
