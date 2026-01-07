const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(20).trim().required(),
  email: Joi.string().email().trim().required(),
  gender: Joi.valid("male", "female", "other").required(),
  dateOfBirth: Joi.date().required(),
  password: Joi.string().min(3).max(25).trim().required(),
}).options({
  abortEarly: false,
  // allowUnknown: false,
});

const loginValidation = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
  // allowUnknown: false,
});

module.exports = { registerValidation, loginValidation };
