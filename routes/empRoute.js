const express = require("express");

const router = express.Router();
const { createEmp } = require("../controller/empControlller");
const {isAuthenticated}  = require("../config/passport.config");

router.post("/addemp", isAuthenticated, createEmp);

module.exports = router;
