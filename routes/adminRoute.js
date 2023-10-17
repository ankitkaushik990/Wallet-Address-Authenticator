const express = require("express");

const router = express.Router();
const { createAdmin, allEmp } = require("../controller/adminController");
const { isAuthenticated } = require("../config/passport.config");

router.post("/add", isAuthenticated, createAdmin);
router.get("/allemp",isAuthenticated ,allEmp);

module.exports = router;
