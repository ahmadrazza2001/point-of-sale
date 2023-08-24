const express = require("express");
const router = express.Router();
const userRoutes = require("../controllers/userController");

router.route("/login").post(userRoutes.loginController);
router.route("/signup").post(userRoutes.signupController);

//router.post("/register", registerController);

module.exports = router;
