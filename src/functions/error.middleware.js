const logger = require("../utils/logger");
const http = require('http')

const errorHandler = (err, req, res,next) => {
 
  // Log the error
  logger.errorLogger(err.message);
  logger.errorLogger(err);

  // Determine the status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    // Optionally, include the stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
