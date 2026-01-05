const db = require("../models/index.js");
const User = db.User;
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: data.username }, { email: data.email }],
    },
  });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  const user = await User.create(data);

  return {
    username: user.username,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    password: user.password,
  };
};

const loginUser = async (identifier, password) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }],
      isDeleted: false,
    },
  });

  if (!existingUser || existingUser == null) {
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
      expiresIn: "2H",
    }
  );

  return {
    token,
  };
};

const makeUserAdmin = async (userId) => {
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
};

const softDeleteUser = async (userId, adminId) => {
  const existingUser = await User.findByPk(userId);

  if (!existingUser || existingUser == null) {
    throw new Error("User doesn't exists!");
  }

  if (existingUser.roleId === 2) {
    throw new Error("You can't delete the other admin!");
  }
  const payload = {
    isDeleted: true,
    deletedBy: adminId,
    deletedAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };

  const deletePost = await User.update(payload, {
    where: {
      userId: userId,
    },
  });
  return deletePost;
};
module.exports = { registerUser, loginUser, makeUserAdmin, softDeleteUser };
