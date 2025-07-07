import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();
console.log("helllo from routes");
router.get("/", CategoryController.getCategories);
export default router;
