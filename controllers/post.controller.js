const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
  getOwnCreatedPost,
} = require("../services/psot.service");
const {
  createPostValidation,
  editPostValidation,
} = require("../validations/post.validation");

exports.getPosts = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    const roleId = req.user.roleId;
    if (!userId || userId === null || !roleId)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const posts = await getPosts(userId, roleId);
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
    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const postId = parseInt(req.params.id);

    if (!postId || postId === null)
      return res
        .status(400)
        .json({ success: false, message: "Invalid post id" });

    const post = await getPostById(postId, req.user.userId, req.user.roleId);
    if (!post || post === null)
      return res
        .status(404)
        .json({ success: false, message: "Post not found!" });

    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserOwnPost = async (req, res) => {
  try {
    // console.log(req.user, " and ", req.user.userId);
    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const post = await getOwnCreatedPost(req.user.userId);
    if (!post || post === null) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!" });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { error } = createPostValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let mediaURL = null;
    let mediaType = "none";

    if (req.file) {
      mediaURL = `/uploads/${req.file.filename}`;
      mediaType = "image";
    }
    const postData = {
      ...req.body,
      mediaURL,
      mediaType,
    };
    const post = await createPost(postData, req.user.userId);

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
    const postId = parseInt(req.params.id);

    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    const { error } = editPostValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let mediaURL = null;
    let mediaType = "none";

    if (req.file) {
      mediaURL = `uploads/${req.file.filename}`;
      mediaType = "image";
    }

    const postData = {
      ...req.body,
      mediaURL,
      mediaType,
    };
    const post = await editPost(postData, postId);
    // console.log("editPost data: ", post);

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
    const postId = parseInt(req.params.id);

    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    const post = await softDeletePost(postId, req.user.userId);

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
