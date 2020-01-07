const Joi = require('@hapi/joi')

exports.customerRouterSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().example('1900-01-01')
})
