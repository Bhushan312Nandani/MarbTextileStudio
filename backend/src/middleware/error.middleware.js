/**
 * Owner: Member 4 (Security Specialist)
 * Central error handler. Must be registered LAST in app.js, after all routes.
 * Any `next(err)` call from a controller ends up here.
 */
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      // Only leak stack traces outside production
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
}

module.exports = errorHandler;
