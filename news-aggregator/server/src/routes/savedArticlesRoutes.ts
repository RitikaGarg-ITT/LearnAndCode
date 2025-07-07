// routes/savedArticleRoutes.ts
import { Router } from "express";
import SavedArticleController from "../controllers/savedarticleController";
const router = Router();

router.post("/", SavedArticleController.saveArticle);
router.get("/", SavedArticleController.getSavedArticles);
router.delete("/:id", SavedArticleController.deleteSavedArticle);

export default router;
