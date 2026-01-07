const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  register,
  login,
  newAdmin,
  deleteUser,
} = require("../controllers/auth.controller.js");
var router = express.Router();
const validation = require("../middleware/validate.middleware.js");
const { registerValidation } = require("../validations/auth.validation.js");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello World!");
});

router.post("/register", validation(registerValidation), register);
router.post("/login", login);
router.put("/promote/:userId", authMiddleware(), newAdmin);
router.delete("/deleteUser/:userId", authMiddleware(), deleteUser);

module.exports = router;
