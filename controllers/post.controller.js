const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
} = require("../services/psot.service");
const {
  createPostValidation,
  editPostValidation,
  deletePostValidation,
} = require("../validations/post.validation");

exports.getPosts = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    if (!userId || userId === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const posts = await getPosts(userId);
    if (!posts || posts === null)
      return res
        .status(404)
        .json({ success: false, message: "No post found!" });

    return res.json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    if (!userId || userId === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid post id" });

    const post = await getPostById(postId, userId || 0);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    // console.log("userId is:- ", userId);

    if (!userId || userId === null)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { error } = createPostValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const post = await createPost(req.body, userId);
    // console.log("post data: ", post);

    if (post) {
      res.status(201).json({
        success: true,
        message: "Post added successfully.",
        post,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    const postId = parseInt(req.params.id);

    // console.log("in controller editPost id: ", postId);

    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const { error } = editPostValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const post = await editPost(req.body, postId);
    console.log("editPost data: ", post);

    if (post) {
      res.status(201).json({
        success: true,
        message: "Post edited successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.softDeletePost = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    const postId = parseInt(req.params.id);

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    const post = await softDeletePost(postId, userId);

    if (post) {
      res.status(201).json({
        success: true,
        message: "Post deleted successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
