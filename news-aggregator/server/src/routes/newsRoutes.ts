import { Router } from "express";
import NewsController from "../controllers/newsController";

const router = Router();

router.post("/fetch-news", NewsController.manualFetch);

export default router;
