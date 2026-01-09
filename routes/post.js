var express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
  getUserOwnPost,
  getPostWithComments,
  likePost,
} = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const validation = require("../middleware/validate.middleware.js");
const {
  createPostValidation,
  editPostValidation,
} = require("../validations/post.validation.js");

var router = express.Router();

router.get("/", authMiddleware(), getPosts);
router.post(
  "/",
  authMiddleware(),
  upload.single("media"),
  validation(createPostValidation),
  createPost
);
router.get("/getUserOwnPost", authMiddleware(), getUserOwnPost);
router.get("/:postId", authMiddleware(), getPostById);
router.put(
  "/:postId",
  authMiddleware(true),
  upload.single("media"),
  validation(editPostValidation),
  editPost
);
router.delete("/:postId", authMiddleware(true), softDeletePost);
router.post("/likePost/:postId", authMiddleware(), likePost);
module.exports = router;
