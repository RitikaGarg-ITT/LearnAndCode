import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import newsRoutes from "./routes/newsRoutes";
import NotificationScheduler from "./jobs/notificationScheduler";
import NewsFetcherScheduler from "./jobs/newsFetcher";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

// Start scheduled jobs
NewsFetcherScheduler.start();
NotificationScheduler.start();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
