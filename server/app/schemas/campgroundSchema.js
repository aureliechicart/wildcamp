const Joi = require('joi');

const schema = {
  newCampground: Joi.object({
    title: Joi.string().required().messages({
      'string.empty': `The campground's title is missing`,
      'string.base': `The title must be a string`
    }),
    image: Joi.string().required().messages({
      'string.empty': `The campground's image URL is missing`,
      'string.base': `The image URL must be a string`
    }),
    description: Joi.string().required().messages({
      'string.empty': `The campground's description is missing`,
      'string.base': `The description must be a string`
    }),
    country: Joi.string().required().messages({
      'string.empty': `The campground's title is missing`,
      'string.base': `The country must be a string`
    }),
    user_id: Joi.number().required().messages({
      'number.empty': `The campground's user id is missing`,
      'number.base': `The user id must be a number`
    }),
  }),

  updateCampground: Joi.object({
    title: Joi.string().allow(null, '').messages({
      'string.base': `The title must be a string`
    }),
    image: Joi.string().allow(null, '').messages({
      'string.base': `The image URL must be a string`
    }),
    description: Joi.string().allow(null, '').messages({
      'string.base': `The description must be a string`
    }),
    country: Joi.string().allow(null, '').messages({
      'string.base': `The country must be a string`
    }),
    user_id: Joi.number().allow(null, '').messages({
      'number.base': `The user id must be a number`
    }),
  })

}

module.exports = schema;