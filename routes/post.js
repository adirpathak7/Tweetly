var express = require('express');
const { getPosts, getPostById, createPost } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
var router = express.Router();

router.get('/posts', authMiddleware, getPosts);
router.get('/posts/:id', authMiddleware, getPostById);
router.post('/posts', authMiddleware, createPost);

module.exports = router;
