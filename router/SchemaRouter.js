const ObjectRouter = require('./ObjectRouter.js')

module.exports = class SchemaRouter extends ObjectRouter {

  constructor(_modelSchema, _dataObject)
  {

    super(_dataObject);

    this.modelSchema = _modelSchema;

    this.setGetMethod();
    this.setPostMethod();
    this.setPutMethod();
    this.setDeleteMethod();

  }

  setGetMethod()
  {
    this.router.get('/',
    async (req, res) =>{

      let cond = undefined
      if(req.query.id){cond = {_id: req.query.id}}

      const result = await this.RouterHelper.tryCatchLog
      (
        this.RouterHelper.authTokenCheck
        (
          req.header('x-auth-token'),
          this.dataObject.getResource
        )
      )(cond, req.query.skip, req.query.limit)
      res.status(result.status).send(result.send)
    })
  }


  setPostMethod()
  {
    this.router.post('/',
    async (req, res) =>{
      const result = await this.RouterHelper.tryCatchLog
      (
        this.RouterHelper.authTokenCheck
        (
          req.header('x-auth-token'),
          this.RouterHelper.reqSchemaValidator(
            req.body,
            this.modelSchema,
            this.RouterHelper.asTransaction
            (
              this.dataObject.addResource
            )
          )
        )
      )(req.body, this.RouterHelper.getUser(req.header('x-auth-token')))
      res.status(result.status).send(result.send)
    })
  }


  setPutMethod()
  {
    this.router.put('/',
    async (req, res) =>{
      const result = await this.RouterHelper.tryCatchLog
      (
        this.RouterHelper.authTokenCheck
        (
          req.header('x-auth-token'),
          this.RouterHelper.reqSchemaValidator
          (
            req.body,
            this.modelSchema,
            this.RouterHelper.objectIdValidator
            (
              req.query.id,
              this.RouterHelper.asTransaction
              (
                this.dataObject.updateResource
              )
            )
          )
        )
      )({_id: req.query.id}, req.body, this.RouterHelper.getUser(req.header('x-auth-token')))
      res.status(result.status).send(result.send)
    })
  }


  setDeleteMethod()
  {
    this.router.delete('/',
    async (req, res) =>{
      const result = await this.RouterHelper.tryCatchLog
      (
        this.RouterHelper.authTokenCheck
        (
          req.header('x-auth-token'),
          this.RouterHelper.objectIdValidator(
            req.query.id,
            this.RouterHelper.asTransaction
            (
                this.dataObject.deleteResource
            )
          )
        )
      )({_id: req.query.id})
      res.status(result.status).send(result.send)
    })
  }

}
