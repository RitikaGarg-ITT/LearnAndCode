import { Router } from "express";
import NewsController from "../controllers/newsController";

const router = Router();

// Route to manually trigger news fetching
router.post("/fetch-news", NewsController.manualFetch);

export default router;
