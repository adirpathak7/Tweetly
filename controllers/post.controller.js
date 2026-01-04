const { getPosts, getPostById, createPost } = require("../services/psot.service");
const { createPostValidation } = require('../validations/post.validation');

exports.getPosts = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        const posts = await getPosts(userId || 0);
        return res.json({ success: true, data: posts });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        const postId = parseInt(req.params.id, 10);
        if (isNaN(postId)) return res.status(400).json({ success: false, message: 'Invalid post id' });

        const post = await getPostById(postId, userId || 0);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        return res.json({ success: true, data: post });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const { error, value } = createPostValidation.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details.map(d => d.message).join(', ') });

        // normalize empty strings to null for mediaURL
        // if (value.mediaURL === '') value.mediaURL = null;

        const post = await createPost(value, userId);
        return res.status(201).json({ success: true, data: post });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};