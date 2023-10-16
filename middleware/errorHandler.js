const errorHandler = (error, eq, res, next) => {
  return res.status(400).send(error.message);
};

module.exports = errorHandler;
