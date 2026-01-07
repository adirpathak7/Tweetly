const {
  getComments,
  addComment,
  editComment,
  softDeleteComment,
} = require("../services/comment.service");
const {
  addCommentValidation,
  editCommentValidation,
} = require("../validations/comment.validation");

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log("postId: ", postId);

    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    const comments = await getComments(postId);
    console.log("comments: ", comments);

    if (!comments || comments === null) {
      return res
        .status(404)
        .json({ success: false, message: "Comments doesn't exist!" });
    }
    return res.json({ success: true, data: comments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!postId)
      return res
        .status(404)
        .json({ success: false, message: "Please provide postId!" });

    const { error } = addCommentValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const comment = await addComment(req.body, req.user.userId, postId);
    // console.log("post data: ", post);

    if (comment) {
      res.status(201).json({
        success: true,
        message: "Comment added successfully.",
        comment,
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

exports.editComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    console.log("userId: ", req.user.userId);

    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postid!" });

    if (!commentId || commentId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide commentId!" });

    const { error } = editCommentValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const comment = await editComment(
      req.body,
      postId,
      req.user.userId,
      commentId
    );

    if (comment) {
      res.status(201).json({
        success: true,
        message: "Comment edited successfully.",
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

exports.softDeleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    if (!req.user || req.user === null)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    if (!postId || postId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide postId!" });

    if (!commentId || commentId === null)
      return res
        .status(401)
        .json({ success: false, message: "Please provide commentId!" });

    const post = await softDeleteComment(
      req.body,
      postId,
      req.user.userId,
      commentId
    );

    if (post) {
      res.status(201).json({
        success: true,
        message: "Comment deleted successfully.",
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
