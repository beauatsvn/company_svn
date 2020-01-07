const Joi = require('@hapi/joi')
const emailRouterSchema = require('./email.js')
const locationRouterSchema = require('./location.js')
const customerRouterSchema = require('./customer')

exports.customerMasterRouterSchema = Joi.object({
  customer: customerRouterSchema,
  email: Joi.array().items(emailRouterSchema),
  location: Joi.array().items(locationRouterSchema)
})
