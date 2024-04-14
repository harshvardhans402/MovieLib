const express = require("express");
const router = express.Router();
const {
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/auth");

router.get("/user", isLoggedIn);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;