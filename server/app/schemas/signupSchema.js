const Joi = require('joi');

const schema = {
  newSignup: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'io'] } }).required().messages({
      'string.email': `Email address is invalid`,
      'string.empty': `Email address cannot be empty`,
      'string.base': `Email address should be a type of text`,
      'any.required': `Email address is required`
    }),
    username: Joi.string().required().messages({
      'string.empty': `Username cannot be empty`,
      'any.required': `Username is required`,
      'string.base': `Username should be a type of text`
    }),
    password: Joi.string().min(5).required().messages({
      'string.empty': `Password cannot be empty`,
      'any.required': `Password is required`,
      'string.base': `Password should be a type of text`,
      'string.min': `Password should be at least 5 characters long`
    }),
    passwordConfirm: Joi.ref('password'),
  }),

}

module.exports = schema;