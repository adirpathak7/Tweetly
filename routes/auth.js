const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  register,
  login,
  newAdmin,
  deleteUser,
} = require("../controllers/auth.controller.js");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/hello", function (req, res, next) {
  res.send("hello world");
});

router.post("/register", register);
router.post("/login", login);

router.put("/promote/:userId", authMiddleware(), newAdmin);
router.delete("/deleteUser/:userId", authMiddleware(), deleteUser);

module.exports = router;
