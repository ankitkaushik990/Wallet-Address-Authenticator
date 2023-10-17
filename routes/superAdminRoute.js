const express = require("express");

const router = express.Router();
const {
  registerSuperAdmin,
  loginUser,
  logoutUser,
  allcompany,
} = require("../controller/superAdminController");
const { isAuthenticated } = require("../config/passport.config");

router.post("/login", loginUser, (req, res) => {
  try {
    res.send({ message: `user logged in successfully` });
  } catch (err) {
    res.status(400).send({ message: "something went wrong" });
  }
});

router.post("/register", registerSuperAdmin);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/allcompany", isAuthenticated,allcompany);

module.exports = router;