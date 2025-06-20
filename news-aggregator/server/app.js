const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes"); // Add to existing app.js
const newsRoutes = require("./src/routes/newsRoutes");
require("./src/jobs/newsFetcher");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
console.log(" 1 hi from app.js");
app.use("/api/news", newsRoutes);
// startNewsFetcher(); // Start scheduled job

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
