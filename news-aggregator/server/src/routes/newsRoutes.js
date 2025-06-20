const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.post("/fetch-news", newsController.manualFetch);

module.exports = router;
