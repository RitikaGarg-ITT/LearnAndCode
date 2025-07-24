import { Router } from "express";
import { ArticleReactionController } from "../controllers/articleReactionController";
const router = Router();

router.post("/like", ArticleReactionController.likeArticle);
router.post("/dislike", ArticleReactionController.dislikeArticle);
router.post("/get-reactions", ArticleReactionController.getArticleReactions);

export default router;
