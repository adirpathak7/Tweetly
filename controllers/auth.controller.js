const {
  loginValidation,
  registerValidation,
} = require("../validations/auth.validation.js");
const {
  loginUser,
  registerUser,
  makeUserAdmin,
  softDeleteUser,
} = require("../services/auth.service.js");

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
    const data = await loginUser(req.body.identifier, req.body.password);
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

const newAdmin = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.roleId !== 2) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have access to change!" });
    }

    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    const updated = await makeUserAdmin(userId);
    res.status(200).json({
      success: true,
      message: "User promoted to admin.",
      user: updated,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin || admin.roleId !== 2) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have access to change!" });
    }

    const userId = parseInt(req.params.userId);

    const adminId = admin.userId;
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    if (!userId || userId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide userId!" });

    const user = await softDeleteUser(userId, adminId);

    if (user) {
      res.status(201).json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login, newAdmin, deleteUser };
