module.exports = (err, req, res, next) => {
  // console.log("err: ", err);
  // console.log("err.Joi: ", err.isJoi);

  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Validation failed!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.isJoi) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Entity!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.isJoi) {
    return res.status(404).json({
      success: false,
      message: "No data found!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.isJoi) {
    return res.status(401).json({
      success: false,
      message: "Unauthorize:!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.isJoi) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Access Denied!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.isJoi) {
    return res.status(503).json({
      success: false,
      message: "Service temporarily unavailable!",
      errors: err.details.map((e) => e.message),
    });
  }

  if (err.status) {
    // console.log("err.status in globleErrorHandle:- ", err.status);
    // console.log("err in globleErrorHandle:- ", err);
    // console.log("err in globleErrorHandle:- ", err.message);

    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unknown error status:- ", err.status);
  // console.error("Unknown error:- ", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error!",
  });
};
