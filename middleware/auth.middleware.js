const jwt = require("jsonwebtoken");
const { Post, Comment } = require("../models");

const authMiddleware = (checkRole = false) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Authorization header missing",
        });
      }

      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Invalid authorization format",
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { userId: decoded.userId, roleId: decoded.roleId };
      // console.log("req.user ", req.user);
      // console.log("checkRole ", checkRole);

      if (checkRole) {
        const postId = parseInt(req.params.id || req.params.postId, 10);
        if (isNaN(postId)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid post id" });
        }

        const post = await Post.findByPk(postId);
        if (!post) {
          return res
            .status(404)
            .json({ success: false, message: "Post not found" });
        }

        if (post.userId === req.user.userId || req.user.roleId === 2) {
          return next();
        }

        const comment = await Comment.findOne({
          where: { postId, userId: req.user.userId },
        });
        if (comment) {
          return next();
        }

        return res.status(403).json({
          success: false,
          message: "You are not authorized to modify this post!",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized or token expired",
      });
    }
  };
};

module.exports = authMiddleware;
