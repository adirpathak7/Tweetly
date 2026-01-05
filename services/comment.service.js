const { Op, where } = require("sequelize");
const { Comment, Post } = require("../models");

exports.getComments = async (postId) => {
  const comments = await Comment.findAll({
    where: {
      postId: postId,
      isDeleted: false,
    },
    order: [["createdAt", "DESC"]],
  });

  if (!comments || comments.length === 0) {
    throw new Error("No comments on this post");
  }

  return comments;
};

exports.addComment = async (data, userId, postId) => {
  const existPost = await Post.findByPk(postId);

  if (!existPost || existPost == null) {
    throw new Error("Post doesn't exists!");
  }

  const payload = {
    commentText: data.commentText,
    postId: postId,
    userId: userId,
  };

  const newComment = await Comment.create(payload);
  return newComment;
};

exports.editComment = async (data, postId, userId, commentId) => {
  const existPost = await Post.findByPk(postId);

  if (!existPost || existPost == null) {
    throw new Error("Post doesn't exists!");
  }

  const existComment = await Comment.findOne({
    where: {
      postId: postId,
      userId: userId,
      commentId: commentId,
    },
  });

  if (!existComment || existComment == null) {
    throw new Error("Comment doesn't exists!");
  }

  const payload = {
    commentText: data.commentText,
    updatedAt: new Date().toLocaleString(),
  };

  const editedComment = await Comment.update(payload, {
    where: {
      commentId: commentId,
    },
  });
  return editedComment;
};

exports.softDeleteComment = async (data, postId, userId, commentId) => {
  //   console.log("postId: ", postId);

  const existPost = await Post.findByPk(postId);
  //   console.log("existPost: ", existPost);

  if (!existPost || existPost == null) {
    throw new Error("Post doesn't exists!");
  }

  const existComment = await Comment.findOne({
    where: {
      postId: postId,
      userId: userId,
      commentId: commentId,
    },
  });

  console.log("existComment: ", existComment);

  if (!existComment || existComment === null) {
    throw new Error("Comment doesn't exists!");
  }

  const payload = {
    isDeleted: true,
    deletedBy: userId,
    deletedAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };

  const deleteComment = await Comment.update(payload, {
    where: {
      commentId: commentId,
    },
  });
  return deleteComment;
};
