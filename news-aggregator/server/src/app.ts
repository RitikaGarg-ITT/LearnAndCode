import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import newsRoutes from "./routes/newsRoutes";
import NotificationScheduler from "./jobs/notificationScheduler";
import NewsFetcherScheduler from "./jobs/newsFetcher";
import dotenv from "dotenv";
import headlineRoutes from "./routes/headlineRoutes";
import savedArticleRoutes from "./routes/savedArticlesRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userKeywordRoutes from "./routes/userKeywordRoutes";
import articleReactionRoutes from "./routes/articleReactionRoutes";
import articleSearchRoutes from "./routes/articleSearchRoutes";
import articleReportRoutes from "./routes/articleReportRoutes";
import adminRoutes from "./routes/adminRoutes";
import logger from "./utils/logger";
dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use("/api/article-reports", articleReportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/headlines", headlineRoutes);
app.use("/api/saved-articles", savedArticleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user-keywords", userKeywordRoutes);
app.use("/api/article-reactions", articleReactionRoutes);
app.use("/api/articles", articleSearchRoutes);
app.use("/api/admin", adminRoutes);

NewsFetcherScheduler.start();
logger.info("News fetching scheduler started.");
// NotificationScheduler.start();
// logger.info("Notification scheduler started.");

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
logger.info(`Server running on port ${PORT}`);
});
