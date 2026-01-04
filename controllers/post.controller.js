const { getPosts } = require("../services/psot.service");

exports.getPosts = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        const posts = await getPosts(userId || 0);
        return res.json({ success: true, data: posts });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};