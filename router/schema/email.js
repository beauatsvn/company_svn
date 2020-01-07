const Joi = require('@hapi/joi')

exports.emailRouterSchema = Joi.object({
  emailType: Joi.string(),
  value: Joi.string().email().required(),
  customerId: Joi.string().empty('')
})
