var express = require('express');
const { getPosts } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
var router = express.Router();

router.get('/posts', authMiddleware, getPosts)
module.exports = router;
