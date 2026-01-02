const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const existingUser = await User.findOne({
    $or: [{ username: data.username }, { email: data.email }],
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
    roleId: user.roleId,
  };
};

const loginUser = async (email, password) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser || existingUser == null) {
    throw new Error("User doesn't exists!");
  }

  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials!");
  }

  const token = jwt.sign(
    { userId: existingUser.userId, email: existingUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
  };
};

module.exports = { registerUser, loginUser };
