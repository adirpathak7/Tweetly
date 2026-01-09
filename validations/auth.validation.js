const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(20).trim().required().messages({
    "string.min": "Username must be at least 3 characters long!",
    "string.max": "Username must be at most 20 characters long!",
    "string.empty": "Username is required!",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Please provide a valid email address!",
    "string.empty": "Email is required!",
  }),
  gender: Joi.valid("male", "female", "other").required().messages({
    "any.only": "Gender must be one of 'male', 'female', or 'other'!",
    "any.required": "Gender is required!",
  }),
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Please provide a valid date for date of birth!",
    "any.required": "Date of birth is required!",
  }),
  password: Joi.string().min(3).max(25).trim().required().messages({
    "string.min": "Password must be at least 3 characters long!",
    "string.max": "Password must be at most 25 characters long!",
    "string.empty": "Password is required!",
  }),
}).options({
  abortEarly: false,
});

const loginValidation = Joi.object({
  identifier: Joi.string().required().messages({
    "string.empty": "Username or Email is required!",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required!",
  }),
}).options({
  abortEarly: false,
});

module.exports = { registerValidation, loginValidation };
