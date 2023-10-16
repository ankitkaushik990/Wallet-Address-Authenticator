const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const logger = require("./config/logger.config");

const db = require("./config/dbconfig");
const routing = require("./routes/index.route");
const { initializingPassport } = require("./config/passport.config");

const app = express();
const PORT = process.env.PORT || 3001;


// Serve Swagger UI using swagger.json
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.use("/", routing);

app.listen(PORT, () => {
  logger.info(`App connected successfully at http://localhost:${PORT}`);
});

