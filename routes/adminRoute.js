const express = require("express");

const router = express.Router();
const { createAdmin,  } = require("../controller/adminController");
const { isAuthenticated } = require("../config/passport.config");

router.post("/add", isAuthenticated, createAdmin);





module.exports = router;
