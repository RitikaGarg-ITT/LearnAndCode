import { Router } from "express";
import { ArticleSearchController } from "../controllers/articleSearchController";
const router = Router();

router.post("/search", (req, res) => ArticleSearchController.searchArticles(req, res));

export default router;
