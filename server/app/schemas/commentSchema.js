const Joi = require('joi');

const schema = {
  newComment: Joi.object({
    text: Joi.string().allow(null, '').messages({
      'string.empty': `The comment's text is missing`,
      'string.base': `The text must be a string`
    }),
    campground_id: Joi.number().required().messages({
      'number.empty': `The comment's campground id is missing`,
      'number.base': `The campground id must be a number`
    }),
    user_id: Joi.number().required().messages({
      'number.empty': `The comment's user id is missing`,
      'number.base': `The user id must be a number`
    }),
  }),

  updateComment: Joi.object({
    text: Joi.string().allow(null, '').messages({
      'string.base': `The text must be a string`
    }),
    campground_id: Joi.number().allow(null, '').messages({
      'number.base': `The campground id must be a number`
    }),
    user_id: Joi.number().allow(null, '').messages({
      'number.base': `The user id must be a number`
    }),
  })

}

module.exports = schema;