const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");

const { createCompany } = require("../controller/companyController");
const { isAuthenticated } = require("../config/passport.config");

router.post("/addcompany", isAuthenticated, createCompany);

module.exports = router;
