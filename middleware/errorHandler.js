const errorHandler = (error, eq, res, next) => {
   console.error(error);
  return res.status(400).send(error.message);
};

module.exports = errorHandler;
