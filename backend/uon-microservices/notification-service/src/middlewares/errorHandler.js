// src/middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    }
  });
};
