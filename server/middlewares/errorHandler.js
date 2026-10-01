/**
 * Global Error Handler Middleware
 * Menangkap semua runtime error dan mengembalikan response JSON yang seragam & informatif.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  console.error(`[Error] ${req.method} ${req.originalUrl} -`, err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
