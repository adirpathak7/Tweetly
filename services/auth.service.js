const db = require("../models/index.js");
const User = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  try {
    const existingUsername = await User.findOne({
      where: {
        username: data.username,
        isDeleted: false,
      },
    });

    if (existingUsername) {
      throw new Error("Username is already exists!");
    }

    const existingEmail = await User.findOne({
      where: {
        email: data.email,
        isDeleted: false,
      },
    });

    if (existingEmail) {
      throw new Error("Username is already exists!");
    }
    // console.log(data);

    const user = await User.create(data);

    return user;
  } catch (error) {
    throw new Error("Something went wrong!", error.message);
  }
};

const loginUser = async (identifier, password) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
        isDeleted: false,
      },
    });

    if (!existingUser || existingUser === null) {
      throw new Error("User doesn't exists!");
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials!");
    }

    const token = jwt.sign(
      {
        userId: existingUser.userId,
        email: existingUser.email,
        roleId: existingUser.roleId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1D",
      }
    );

    return { token };
  } catch (error) {
    throw error;
  }
};

const makeUserAdmin = async (userId) => {
  try {
    // console.log("userid: ", userId);
    const existingUser = await User.findByPk(userId);

    if (!existingUser || existingUser == null) {
      throw new Error("User doesn't exists!");
    }
    if (existingUser.roleId === 2) {
      throw new Error("User is already an admin!");
    }
    const newAdmin = await User.update(
      { roleId: 2 },
      { where: { userId: userId }, isDeleted: false }
    );
    return newAdmin;
  } catch (error) {
    throw new Error("Something went wrong!", error.message);
  }
};

const softDeleteUser = async (userId, adminId) => {
  try {
    const existingUser = await User.findOne({
      where: {
        userId: userId,
        isDeleted: false,
      },
    });

    if (!existingUser) {
      throw new Error("User doesn't exist or is already deleted!");
    }

    if (existingUser.roleId === 2) {
      throw new Error("You can't delete the other admin!");
    }

    const payload = {
      isDeleted: true,
      deletedBy: adminId,
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
      throw new Error("User is already deleted!");
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  makeUserAdmin,
  softDeleteUser,
  isDeletedUser,
};
