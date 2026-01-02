const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  gender: Joi.valid("male", "female", "other").required(),
  dateOfBirth: Joi.date().required(),
  password: Joi.string().min(3).max(25).required(),
  roleId: Joi.valid(1, 2).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerValidation, loginValidation };
