const Joi = require("joi");

const createPostValidation = Joi.object({
  content: Joi.string().required(),
  mediaURL: Joi.string().allow(null),
  mediaType: Joi.string().default("none"),
}).options({ abortEarly: false });

const editPostValidation = Joi.object({
  content: Joi.string().required(),
  mediaURL: Joi.string().allow(null),
  mediaType: Joi.string().default("none"),
}).options({ abortEarly: false });

const deletePostValidation = Joi.object({
  deletedBy: Joi.required(),
});

module.exports = {
  createPostValidation,
  editPostValidation,
  deletePostValidation,
};
