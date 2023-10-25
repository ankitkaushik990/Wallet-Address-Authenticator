const AppError = require("./appError");
const logger = require("../config/logger.config");
const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  // if (error === "Validation error") {
  //   return res
  //     .status(400)
  //     .json({ errorCode: "456", message: "Validation Errors" });
  // }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  return res.status(500).send(error.message);
};

module.exports = errorHandler;
