const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details.map(d => ({
        field: d.path.join('.'),
        message: d.message,
      })),
    });
  }

  // Database errors
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Unique constraint violation',
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Foreign key constraint violation',
    });
  }

  // Custom errors
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  // Generic error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
  });
};

module.exports = errorHandler;
