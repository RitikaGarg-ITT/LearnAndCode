// server/src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


console.log(" 2 user routes ki vajahs e dimag khrb hora");
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
