const DataObjectInterface = require('./DataObjectInterface')

module.exports = class BaseObject extends DataObjectInterface
{

  constructor()
  {
    super();
    this.getResource = this.getResource.bind(this)
  }

  getResource(){return {status: 200, send: 'Service is running!'}}
}
