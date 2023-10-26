const express = require("express");
const router = express.Router();
const {upload} = require("../middleware/multer")

const { createCompany } = require("../controller/companyController");
const { isAuthenticated } = require("../config/passport.config");

router.post("/addcompany", isAuthenticated,upload.single("image"), createCompany);

module.exports = router;
