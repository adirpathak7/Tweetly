module.exports = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    // console.log("error.isJoi: " + error.isJoi);

    error.isJoi = true;
    return next(error);
  }

  req.body = value;
  next();
};
