
const { Sequelize } = require("sequelize");
const logger = require("./logger.config");

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASS;
const dbHost = process.env.DBHOST; // PostgreSQL database host
const dbPort = process.env.DBPORT; // PostgreSQL database port

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres", // Specify the PostgreSQL dialect
  timezone: "+05:30",
  logging: false,
});

async function connectToDb() {
  try {
    await sequelize.authenticate();
    logger.info("Connected to PostgreSQL database successfully");
  } catch (error) {
    logger.error("Error occurred while connecting to the database:", error);
  }
}

connectToDb();
module.exports = sequelize;

