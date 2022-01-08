const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");

router.get("/current-user", userController.getCurrentUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/signup", userController.signup);

module.exports = router;