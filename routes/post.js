var express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
} = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
var router = express.Router();

router.get("/", authMiddleware(), getPosts);
router.post("/", authMiddleware(), upload.single("media"), createPost);
router.get("/:id", authMiddleware(), getPostById);
router.put("/:id", authMiddleware(true), upload.single("media"), editPost);
router.delete("/:id", authMiddleware(true), softDeletePost);

module.exports = router;
