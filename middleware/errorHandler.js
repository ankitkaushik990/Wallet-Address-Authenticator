const AppError = require("./appError");
const logger = require("../config/logger.config");

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    logger.error(error.message);
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  return res.status(500).send(error.message);
};

module.exports = errorHandler;
