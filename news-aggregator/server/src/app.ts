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
// Load environment variables
dotenv.config();

const app: Application = express();


import userKeywordRoutes from "./routes/userKeywordRoutes";

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/headlines", headlineRoutes);
app.use("/api/saved-articles", savedArticleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user-keywords", userKeywordRoutes);

// Start scheduled jobs
NewsFetcherScheduler.start();
NotificationScheduler.start();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
