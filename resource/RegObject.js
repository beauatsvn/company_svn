const EncryptedObjectInterface = require('./EncryptedObjectInterface.js')

module.exports = class RegObject extends EncryptedObjectInterface
{
  constructor(_MongooseModel)
  {
    super();
    this.MongooseModel = _MongooseModel;
    this.addResource = this.addResource.bind(this)
    this.getResource = this.getResource.bind(this)
  }

  async getResource(_cond, _skip, _limit)
  {
    const result = await this.MongooseModel.find(_cond).skip(parseInt(_skip)).limit(parseInt(_limit)).select('-__v').lean()
    if(result.length == 0) return {status:404, send:'Resource not found'}
    return {status: 200, send: result}
  }

  async addResource(_json)
  {

    let user = await this.MongooseModel.findOne({username: _json.username})
    if(user) return {status: 400, send: 'User has already registered'}

    user = new this.MongooseModel(_json)
    await user.encryptPassword()
    const result = await user.save()
    return {status: 201, send: user}

  }
}
