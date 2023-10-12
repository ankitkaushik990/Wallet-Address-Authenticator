const express = require("express");
require("dotenv").config();
const ethers = require("ethers");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const db = require("./config/dbconfig")

const authRoute = require("./routes/authRoute")
const compRoute = require("./routes/companyRoute")
const adminRoute = require("./routes/adminRoute")
const empRoute = require("./routes/empRoute");

const { initializingPassport } = require("./config/passport.config");

const app = express();
const PORT = process.env.PORT;
const secret = process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

initializingPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

db.sync();

app.get("/", (req,res) => {
    res.send("test api working ")
})

app.use("/user", authRoute);
app.use("/company", compRoute);
app.use("/admin", adminRoute);
app.use("/emp",empRoute)

app.listen(PORT, () => {
    console.log(`app connected successfully-> ${PORT}`)
})