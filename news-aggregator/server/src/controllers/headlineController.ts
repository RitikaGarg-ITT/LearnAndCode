import { Request, Response } from "express";
import headlineService from "../services/headlineService";
import { Article } from "../models/articles";

class HeadlineController {
  public static async getTodayHeadlines(req: Request, res: Response): Promise<void> {
    try {
      const headlines = await headlineService.getTodayHeadlines();
      res.status(200).json({ headlines });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public static async getHeadlineById(req: Request, res: Response): Promise<void> {
    try {
      const news_id = parseInt(req.params.id, 10);
      const headline = await headlineService.getHeadline(news_id);
      if (!headline) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.status(200).json({ headline });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  public static async getHeadlinesByFilter(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate, category } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ message: "startDate and endDate are required" });
        return;
      }

      // Call your service/repository to fetch headlines by date range and category
      const headlines = await headlineService.getHeadlinesByFilter(
        startDate as string,
        endDate as string,
        category as string | undefined
      );
      res.status(200).json({ headlines });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  // GET /api/headlines/search?query=tesla&startDate=2025-07-01&endDate=2025-07-07
  static async searchHeadlines(req: Request, res: Response) :Promise<void> {
    try {
      const { query, startDate, endDate } = req.query;
  
      const headlines = await headlineService.searchHeadlines(
        query as string,
        startDate as string | undefined,
        endDate as string | undefined
      );
      res.status(200).json({ headlines: headlines as Article[] });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

  

export default HeadlineController;
