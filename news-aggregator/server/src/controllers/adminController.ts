import { Request, Response } from "express";
import { ExternalServerRepository } from "../repositories/ExternalServerRepository";
import db from "../config/db";
import logger from "../utils/logger";

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
}
