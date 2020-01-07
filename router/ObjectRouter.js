const RootRouter = require('./RootRouter.js')

module.exports = class ObjectRouter extends RootRouter{

  constructor(_dataObject)
  {

    super()
    this.dataObject = _dataObject;

    this.setGetMethod();

  }

  setGetMethod ()
  {
    this.router.get('/',
      async (req, res) => {
        const result = await this.RouterHelper.tryCatchLog
        (
          this.dataObject.getResource
        )()
        res.status(result.status).send(result.send)
      })
  }

  getRouter() {return this.router}

}
