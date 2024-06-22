module.exports = {
  errorHandler: (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    let errorMessage = "An error occurred while processing the request.";

    if (error.code === "ETIMEDOUT") {
      errorMessage = "Operation timed out.";
    }

    if (error.code === "ECONNREFUSED") {
      errorMessage = "Connection refused.";
    }
    if (!errorMessage) {
      errorMessage = "An unexpected error occurred.";
    }

    res.json({
      message: errorMessage,
      error: error.message,
      stack: process.env.NODE_ENV === "production" ? "😐🥞" : error.stack,
    });
  },
};
