const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getComments,
  addComment,
  editComment,
  softDeleteComment,
} = require("../controllers/comment.controller");
const validation = require("../middleware/validate.middleware.js");
const {
  addCommentValidation,
  editCommentValidation,
} = require("../validations/comment.validation.js");

var router = express.Router();

router.get("/:postId", authMiddleware(), getComments);
router.post(
  "/:postId",
  authMiddleware(),
  validation(addCommentValidation),
  addComment
);
router.put(
  "/:postId/:commentId",
  authMiddleware(true),
  validation(editCommentValidation),
  editComment
);
router.delete("/:postId/:commentId", authMiddleware(true), softDeleteComment);

module.exports = router;
