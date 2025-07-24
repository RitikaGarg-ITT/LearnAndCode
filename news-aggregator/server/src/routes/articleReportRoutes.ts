import { Router } from "express";
import { ArticleReportController } from "../controllers/articleReportController";
const router = Router();

router.post("/report", (req, res) => ArticleReportController.reportArticle(req, res));

export default router;
