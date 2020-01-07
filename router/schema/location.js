const Joi = require('@hapi/joi')

exports.locationRouterSchema = Joi.object({
  locationType: Joi.string().required(),
  addressLine1: Joi.string(),
  addressLine2: Joi.string().empty(''),
  suburb: Joi.string().required(),
  state: Joi.string().alphanum().min(3).required(),
  postcode: Joi.string().pattern(new RegExp('([0-9])+')).required(),
  customerId: Joi.string().alphanum().empty('')
})
