const Joi = require('@hapi/joi')

exports.addressRouterSchema = Joi.object({
  addressType: Joi.string().required(),
  addressValue: Joi.string().required(),
  customerId: Joi.string().required()
})
