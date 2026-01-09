const Joi = require("joi");

const createPostValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Post content is required!",
  }),
  mediaURL: Joi.string().allow(null),
  mediaType: Joi.string()
    .valid("none", "image", "video")
    .default("none")
    .messages({
      "any.only": "Your selected file must be one of 'image' or 'video'!",
    }),
}).options({ abortEarly: false });

const editPostValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Post content is required!",
  }),
  mediaURL: Joi.string().allow(null),
  mediaType: Joi.string()
    .valid("none", "image", "video")
    .default("none")
    .messages({
      "any.only": "Your selected file must be one of 'image' or 'video'!",
    }),
}).options({ abortEarly: false });

const deletePostValidation = Joi.object({
  deletedBy: Joi.required(),
});

module.exports = {
  createPostValidation,
  editPostValidation,
  deletePostValidation,
};
