const Joi = require("joi");

const addCommentValidation = Joi.object({
  commentText: Joi.string().required(),
}).options({ abortEarly: false });

const editCommentValidation = Joi.object({
  commentText: Joi.string().required(),
}).options({ abortEarly: false });

const deleteCommentValidation = Joi.object({
  deletedBy: Joi.required(),
});

module.exports = {
  addCommentValidation,
  editCommentValidation,
  deleteCommentValidation,
};
