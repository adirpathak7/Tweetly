const { Op, where } = require("sequelize");
const { Post, User, Comment } = require("../models");
const { isDeletedUser } = require("./auth.service");

const getPosts = async (userId, roleId) => {
  const allPost = await Post.findAll({
    where: {
      userId: { [Op.ne]: userId },
      isDeleted: false,
    },
    include: [
      {
        model: User,
        attributes: ["isDeleted"],
        where: roleId === 2 ? {} : { isDeleted: false },
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  if (!allPost) return null;
  return allPost;
};

const getPostById = async (postId, roleId) => {
  const post = await Post.findOne({
    where: {
      postId,
      isDeleted: false,
    },
    include: [
      {
        model: User,
        attributes: ["isDeleted"],
        where: roleId === 2 ? {} : { isDeleted: false },
      },
      {
        model: Comment,
        attributes: ["isDeleted", "postId"],
        where: postId === post.postId,
        isDeleted: false,
      },
    ],
  });

  console.log("postId data: ", postId);
  console.log("roleId data: ", roleId);
  console.log("post data: ", post);

  if (!post) return null;

  // if (post.userId === userId) return null;

  return post;
};

const getOwnCreatedPost = async (userId) => {
  const post = await Post.findAll({
    where: {
      userId,
      isDeleted: false,
    },
  });

  if (!post) return null;
  return post;
};

const createPost = async (data, userId) => {
  // console.log("data: ", data);

  const payload = {
    content: data.content,
    mediaURL: data.mediaURL || null,
    mediaType: data.mediaType || "none",
    userId: userId,
  };
  //   console.log("payload: ", payload);

  const newPost = await Post.create(payload);
  return newPost;
};

const editPost = async (data, postId) => {
  //   console.log("in service postId: ", postId, typeof postId);

  const existPost = await Post.findByPk(postId);
  //   console.log("in service existPost: ", existPost, typeof existPost);

  if (!existPost || existPost === null || existPost.isDeleted) {
    throw new Error("Post doesn't exists!");
  }

  const payload = {
    content: data.content,
    mediaURL: data.mediaURL || null,
    mediaType: data.mediaType || "none",
    updatedAt: new Date().toLocaleString(),
  };

  const editedPost = await Post.update(payload, {
    where: {
      postId: postId,
      isDeleted: false,
    },
  });
  return editedPost;
};

const softDeletePost = async (postId, userId) => {
  // console.log("userId: ", userId);
  // console.log("postId: ", postId);

  const existPost = await Post.findByPk(postId);

  if (!existPost || existPost == null) {
    throw new Error("Post doesn't exists!");
  }

  const payload = {
    isDeleted: true,
    deletedBy: userId,
    deletedAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };

  const deletePost = await Post.update(payload, {
    where: {
      postId: postId,
    },
  });
  return deletePost;
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  editPost,
  softDeletePost,
  getOwnCreatedPost,
};
