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

module.exports = { getPosts };