const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const db = require("./config/dbconfig");

const authRoute = require("./routes/authRoute");
const compRoute = require("./routes/companyRoute");
const adminRoute = require("./routes/adminRoute");
const empRoute = require("./routes/empRoute");

const { initializingPassport } = require("./config/passport.config");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3001; // Set a default port if not provided in the environment

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ETHERS project",
      version: "1.0.0",
    },
    servers: [
      {
        api: "http://localhost:3001/",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

initializingPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

db.sync();

app.get("/", (req, res) => {
  res.send("Test API working");
});

app.use("/user", authRoute);
app.use("/company", compRoute);
app.use("/admin", adminRoute);
app.use("/emp", empRoute);

app.listen(PORT, () => {
  console.log(`App connected successfully at http://localhost:${PORT}`);
});
