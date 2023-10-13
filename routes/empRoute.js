const express = require("express");

const router = express.Router();
const { createEmp, updateEmp } = require("../controller/empControlller");
const { isAuthenticated } = require("../config/passport.config");

router.post("/addemp", isAuthenticated, createEmp);
router.put("/update", isAuthenticated, updateEmp);
module.exports = router;
