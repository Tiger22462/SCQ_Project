const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlware/authMiddleware");

// Fetch user data
router.get("/getuser", authMiddleware, userController.getUserData);

module.exports = router;
