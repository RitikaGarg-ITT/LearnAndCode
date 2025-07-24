import { Router } from "express";
import { AdminController } from "../controllers/adminController";

const router = Router();

router.get("/servers", AdminController.listExternalServers);
router.get("/servers/:id", AdminController.getExternalServerDetails);
router.put("/servers/:id", AdminController.updateExternalServer);
router.post("/categories", AdminController.addCategory);
router.post("/servers", AdminController.addServer);
router.put("/articles/:articleId/visibility", AdminController.toggleArticleVisibility);
router.put("/categories/:categoryId/visibility", AdminController.toggleCategoryVisibility);
router.post("/keywords", AdminController.addBlockedKeyword);
router.get("/keywords", AdminController.listBlockedKeywords);
router.delete("/keywords/:keyword", AdminController.removeBlockedKeyword);


export default router;
