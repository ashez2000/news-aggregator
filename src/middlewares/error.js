export const notFound = (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  })
}

export const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'AppError') {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: err.message,
    })
  }

  res.status(500).json({
    message: 'Internal Server Error',
  })
}
