const express = require("express");

const router = express.Router();
const { registerSuperAdmin, loginUser } = require("../controller/authController");
const { isAuthenticated } = require("../config/passport.config");





router.post("/login", loginUser, (req,res) => {
    try {
        res.send({ message: `user logged in successfully` })
    } catch (err) {
        res.status(400).send({message:'something went wrong'})
    }
});



router.post("/register",registerSuperAdmin);

module.exports = router;