const express = require("express");
const LoginHistory = require("../model/loginHistory");

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

    // Save the userId and ipAddress to the LoginHistory table
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