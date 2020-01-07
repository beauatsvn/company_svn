const ObjectRouter = require('./ObjectRouter.js')

module.exports = class AuthRouter extends ObjectRouter {

  constructor(_modelSchema, _dataObject)
  {

    super(_dataObject)
    this.modelSchema = _modelSchema;
    this.setPostMethod();

  }

  setPostMethod()
  {
    this.router.post('/',
    async (req, res) => {
      const result = await this.RouterHelper.tryCatchLog
      (
        this.RouterHelper.reqSchemaValidator
        (
          req.body,
          this.modelSchema,
          this.dataObject.addResource
        )
      )(req.body)
      res.status(result.status).header('x-auth-token', result.token).send(result.send)
    })
  }
}
