// Not Found Middleware
const notFound = (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    success : false
  })
}

// Global Error Handler Middleware
const errorHandler =(err, req, res, next)=>{
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
}

module.exports = {notFound, errorHandler};