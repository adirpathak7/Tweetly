const express = require("express");
const { register, login } = require("../controllers/auth.controller.js");
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

module.exports = router;
