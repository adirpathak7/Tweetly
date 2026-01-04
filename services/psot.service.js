const db = require("../models");
const Post = db.Post;
const { Op } = require("sequelize");

const getPosts = async (userId) => {
    return await Post.findAll({
        where: {
            userId: { [Op.ne]: userId },
            isDeleted: false,
        },
        order: [["createdAt", "DESC"]],
    });
};

const getPostById = async (postId, userId) => {
    const post = await Post.findOne({
        where: {
            postId,
            isDeleted: false,
        },
    });

    if (!post) return null;

    // hide user's own post (per requirement)
    if (post.userId === userId) return null;

    return post;
};

const createPost = async (data, userId) => {
    const payload = {
        content: data.content,
        mediaURL: data.mediaURL,
        mediaType: data.mediaType,
        userId: userId,
    };

    const newPost = await Post.create(payload);
    return newPost;
};

module.exports = { getPosts, getPostById, createPost };