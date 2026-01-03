const {
  loginValidation,
  registerValidation,
} = require("../validations/auth.validation.js");
const { loginUser, registerUser } = require("../services/auth.service.js");

const register = async (req, res) => {
  const { error } = registerValidation.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const data = await loginUser(req.body.email, req.body.password);
    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { register, login };
