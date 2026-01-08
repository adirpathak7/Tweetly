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
const { User } = require("../models/index.js");
const ApiError = require("../utils/ApiError.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, email, gender, dateOfBirth, password } = req.body;

    // console.log(req.username);

    const existingUsername = await User.findOne({
      where: {
        username: username,
        isDeleted: false,
      },
    });

    if (existingUsername) {
      return next(new ApiError("Username is already exist!", 409));
    }

    const existingEmail = await User.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
    });

    if (existingEmail) {
      return next(new ApiError("Email is alreadd exist!", 409));
    }

    const user = await User.create({
      username,
      email,
      gender,
      dateOfBirth,
      password,
    });
    // console.log("user: ", user);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
        isDeleted: false,
      },
    });
    // console.log(existingUser);

    if (!existingUser || existingUser === null) {
      return next(new ApiError("Account doesn't exists!", 404));
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError("Invalid credentials!", 401));
    }

    const token = jwt.sign(
      {
        userId: existingUser.userId,
        username: existingUser.username,
        roleId: existingUser.roleId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const newAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.roleId !== 2) {
      return next(new ApiError("You don't have access to change!", 403));
    }

    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return next(new ApiError("Invalid user id", 400));
    }

    const existingUser = await User.findByPk(userId);

    if (!existingUser || existingUser === null) {
      return next(new ApiError("User doesn't exists!", 404));
    }
    if (existingUser.roleId === 2) {
      return next(new ApiError("User is already an admin!", 400));
    }

    const newAdmin = await User.update(
      { roleId: 2 },
      { where: { userId: userId }, isDeleted: false }
    );
    return res.status(200).json({
      success: true,
      message: "User promoted as an admin.",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.roleId !== 2) {
      return next(new ApiError("You don't have access to change!", 403));
    }

    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return next(new ApiError("Invalid user id!", 400));

    if (!userId || userId === null)
      return next(new ApiError("User id is required", 400));

    const existingUser = await User.findOne({
      where: {
        userId: userId,
        isDeleted: false,
      },
    });

    if (!existingUser || existingUser === null) {
      return next(
        new ApiError("User doesn't exist or is already deleted!", 404)
      );
    }
    if (existingUser.roleId === 2) {
      return next(new ApiError("You can't delete the other admin!", 403));
    }

    const payload = {
      isDeleted: true,
      deletedBy: user.userId,
      deletedAt: new Date(),
      updatedAt: new Date(),
    };

    const [updatedCount] = await User.update(payload, {
      where: {
        userId: userId,
        isDeleted: false,
      },
    });

    if (updatedCount === 0) {
      return next(new ApiError("User is already deleted!", 400));
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, newAdmin, deleteUser };
