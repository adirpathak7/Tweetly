const { Op } = require("sequelize");
const { Post, User, Comment } = require("../models");
const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
  getOwnCreatedPost,
} = require("../services/psot.service");
const ApiError = require("../utils/ApiError");
const {
  createPostValidation,
  editPostValidation,
} = require("../validations/post.validation");
const { date } = require("joi");

exports.getPosts = async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId;
    const roleId = req.user.roleId;

    if (!userId || userId === null || !roleId)
      return next(new ApiError("Unauthorized!", 401));

    const allPost = await Post.findAll({
      where: {
        userId: { [Op.ne]: userId },
        isDeleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["isDeleted"],
          where: { isDeleted: false },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!allPost || allPost === null)
      return next(new ApiError("No posts found!", 404));

    return res.json({ success: true, data: allPost });
  } catch (err) {
    return next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    const postId = parseInt(req.params.postId);

    if (!postId || postId === null)
      return next(new ApiError("Please provide postid!", 400));

    const post = await Post.findOne({
      where: {
        postId,
        isDeleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["isDeleted"],
          where: { isDeleted: false },
        },
        {
          model: Comment,
          attributes: ["commentText", "userId"],
          where: { postId: postId, isDeleted: false },
          required: false,
        },
      ],
    });

    if (!post || post === null)
      return next(new ApiError("Post not found!", 404));

    return res.json({ success: true, data: post });
  } catch (err) {
    return next(err);
  }
};

exports.getUserOwnPost = async (req, res, next) => {
  try {
    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    const post = await Post.findAll({
      where: {
        userId: req.user.userId,
        isDeleted: false,
      },
    });

    if (!post || post === null || post.length === 0) {
      return next(new ApiError("No posts found!", 404));
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    const { content } = req.body;

    let mediaURL = null;
    let mediaType = "none";

    if (req.file) {
      mediaURL = `/uploads/${req.file.filename}` || null;
      mediaType = "image" || "none";
    }

    const postData = {
      content: content,
      mediaURL: mediaURL || null,
      mediaType: mediaType || "none",
      userId: req.user.userId,
    };

    const post = await Post.create(postData);

    if (post)
      return res.status(201).json({
        success: true,
        message: "Post created successfully.",
        data: post,
      });
  } catch (err) {
    return next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);

    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    const { content } = req.body;

    let mediaURL = null;
    let mediaType = "none";

    if (req.file) {
      mediaURL = `/uploads/${req.file.filename}` || null;
      mediaType = "image" || "none";
    }

    const editedPost = {
      content: content,
      mediaURL: mediaURL || null,
      mediaType: mediaType || "none",
      updatedAt: new Date().toLocaleString(),
    };

    const updatedPost = await Post.update(editedPost, {
      where: {
        postId: postId,
        isDeleted: false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Post edited successfully.",
    });
  } catch (err) {
    return next(err);
  }
};

exports.softDeletePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);

    if (!req.user || req.user === null)
      return next(new ApiError("Unauthorized!", 401));

    if (!postId || postId === null)
      return next(new ApiError("Please provide postId!", 400));

    const existPost = await Post.findByPk(postId);
    if (!existPost || existPost == null || existPost.isDeleted) {
      return next(new ApiError("Post doesn't exists or already deleted!", 404));
    }

    const payload = {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    await Post.update(payload, {
      where: {
        postId: postId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (err) {
    return next(err);
  }
};
