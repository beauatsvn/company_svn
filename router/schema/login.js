const Joi = require('@hapi/joi')

exports.loginRouterSchema = Joi.object({
  username: Joi.string().required().min(6).max(50),
  password: Joi.string().required().min(6).max(1024)
})
