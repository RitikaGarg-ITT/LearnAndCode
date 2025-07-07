import { Router } from "express";
import HeadlineController from "../controllers/headlineController";

const router = Router();
router.get("/", HeadlineController.getHeadlinesByFilter);
router.get("/today", HeadlineController.getTodayHeadlines);
router.get("/:id", HeadlineController.getHeadlineById);

export default router;
