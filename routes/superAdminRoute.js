const express = require("express");


const db = require("../models");
const LoginHistory = db.Login_history;

const router = express.Router();
const {
  registerSuperAdmin,
  loginUser,
  logoutUser,
  allcompany,
} = require("../controller/superAdminController");
const { isAuthenticated } = require("../config/passport.config");
const { checkPreviousLogin } = require("../middleware/checklogin");

router.post("/login", loginUser, checkPreviousLogin, async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const ipAddress = req.ip;
    await LoginHistory.create({ ipAddress, userId, email });
    res.send({ message: `user logged in successfully` });
  } catch (err) {
    res.status(400).send({ message: "something went wrong", err: err.message });
  }
});


router.post("/register", registerSuperAdmin);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/allcompany", isAuthenticated,allcompany);

module.exports = router;