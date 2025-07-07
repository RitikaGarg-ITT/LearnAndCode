import { Router } from "express";
import { UserKeywordController } from "../controllers/userKeywordController";
const router = Router();

router.get("/", UserKeywordController.getKeywords);
router.post("/", UserKeywordController.addKeyword);
router.delete("/", UserKeywordController.deleteKeyword);

export default router;
