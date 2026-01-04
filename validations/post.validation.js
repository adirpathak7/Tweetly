const Joi = require('joi');

const createPostValidation = Joi.object({
    content: Joi.string().max(1000)
    //   mediaURL: Joi.string().uri().allow(null, '').default(null),
    //   mediaType: Joi.string().valid('none', 'image', 'video').default('none'),
}).or('content', 'mediaURL');

module.exports = { createPostValidation };
