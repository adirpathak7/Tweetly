const { Comment, Post } = require("../models");
const {
  getComments,
  addComment,
  editComment,
  softDeleteComment,
} = require("../services/comment.service");
const ApiError = require("../utils/ApiError");
const {
  addCommentValidation,
  editCommentValidation,
} = require("../validations/comment.validation");

exports.getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    const existPost = await Post.findOne({
      where: { postId, isDeleted: false },
    });

    if (!existPost || existPost === null)
      return next(new ApiError("Post doesn't exists or deleted!", 404));

    const comments = await Comment.findAll({
      where: {
        postId: postId,
        isDeleted: false,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!comments || comments === null || comments.length === 0) {
      return next(new ApiError("No comments found on this post!", 404));
    }
    return res.json({ success: true, data: comments });
  } catch (err) {
    return next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const data = req.body;
    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    const existPost = await Post.findOne({
      where: { postId, isDeleted: false },
    });

    if (!existPost || existPost === null)
      return next(new ApiError("Post doesn't exists or deleted!", 404));

    const payload = {
      commentText: data.commentText,
      postId: postId,
      userId: req.user.userId,
    };

    await Comment.create(payload);
    res.status(201).json({
      success: true,
      message: "Comment added successfully.",
    });
  } catch (err) {
    return next(err);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const data = req.body;
    if (!req.user) return next(new ApiError("Unauthorized!", 401));

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    if (!commentId || commentId === null)
      return next(new ApiError("Please provide commentId!", 400));

    const existPost = await Post.findByPk(postId);

    if (!existPost || existPost === null)
      return next(new ApiError("Post doesn't exists!", 404));

    const existComment = await Comment.findOne({
      where: {
        postId: postId,
        userId: req.user.userId,
        commentId: commentId,
        isDeleted: false,
      },
    });

    if (!existComment || existComment === null)
      return next(new ApiError("Comment doesn't exists!", 404));

    const payload = {
      commentText: data.commentText,
      updatedAt: new Date().toLocaleString(),
    };

    const editedComment = await Comment.update(payload, {
      where: {
        commentId: commentId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Comment edited successfully.",
    });
  } catch (err) {
    return next(err);
  }
};

exports.softDeleteComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    if (!commentId || commentId === null)
      return next(new ApiError("Please provide commentId!", 400));

    const existPost = await Post.findByPk(postId);

    if (!existPost || existPost === null)
      return next(new ApiError("Post doesn't exists!", 404));

    const existComment = await Comment.findOne({
      where: {
        postId: postId,
        userId: req.user.userId,
        commentId: commentId,
      },
    });

    if (!existComment || existComment === null)
      return next(new ApiError("Comment doesn't exists!", 404));

    const payload = {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const data = await Comment.update(payload, {
      where: {
        commentId: commentId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (err) {
    return next(err);
  }
};
