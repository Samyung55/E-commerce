const express = require("express");
const { login, register, forgotpassword, resetpassword } = require("../controls/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);

module.exports = router;
