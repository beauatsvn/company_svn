const EncryptedObjectInterface = require('./EncryptedObjectInterface.js')

module.exports = class AuthObject extends EncryptedObjectInterface
{
  constructor(_MongooseModel)
  {
    super();
    this.MongooseModel = _MongooseModel;
    this.addResource = this.addResource.bind(this)
  }

  async addResource(_json){

    let user = await this.MongooseModel.findOne({username: _json.username})
    if(!user) return {status: 400, send: 'Incorrect username or password', token: ''}

    const result = await user.checkPassword(_json.password)
    if(!result) return {status: 400, send: 'Incorrect username or password', token: ''}

    const token = user.generateAuthToken()
    return {status: 200, send: 'User successfully logged in!', token: token}

  }
}
