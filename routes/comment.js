const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getComments,
  addComment,
  editComment,
  softDeleteComment,
} = require("../controllers/comment.controller");

var router = express.Router();

router.get("/:postId", authMiddleware(), getComments);
router.post("/:postId", authMiddleware(), addComment);
router.put("/:postId/:commentId", authMiddleware(true), editComment);
router.delete("/:postId/:commentId", authMiddleware(true), softDeleteComment);

module.exports = router;
