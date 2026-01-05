var express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
} = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
var router = express.Router();

router.get("/", authMiddleware(), getPosts);
router.post("/", authMiddleware(), createPost);
router.get("/:id", authMiddleware(), getPostById);
router.put("/:id", authMiddleware(true), editPost);
router.delete("/:id", authMiddleware(true), softDeletePost);

module.exports = router;
