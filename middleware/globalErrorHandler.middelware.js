module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Validation failed!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unknown error status code:- ", err.status);
  console.error("Unknown error:- ", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error!",
  });
};
