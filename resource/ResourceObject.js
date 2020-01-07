const DataObjectInterface = require('./DataObjectInterface')

module.exports = class ResourceObject extends DataObjectInterface
{
  constructor(_MongooseModel)
  {

    super();

    this.MongooseModel = _MongooseModel;
    this.getResource = this.getResource.bind(this)
    this.addResource = this.addResource.bind(this)
    this.updateResource = this.updateResource.bind(this)
    this.deleteResource = this.deleteResource.bind(this)

  }

  async getResource(_cond, _skip, _limit)
  {

    const result = await this.MongooseModel.find(_cond).skip(parseInt(_skip)).limit(parseInt(_limit)).select('-__v').lean()
    if(result.length == 0) return {status:404, send:'Resource not found'}
    return {status: 200, send: result}

  }

  async addResource(_payload, _user)
  {

    if(!_payload) return {status: 400, send: 'Bad request: _payload is undefined'}

    const now = Date.now();
    if(Array.isArray(_payload))
    {
      _payload.map((item) => {
        item["createdBy"] = _user._id;
        item["modifiedBy"] = _user._id;
        item["createdDate"] = now;
        item["modifiedDate"] = now;
      })
    } else {
      _payload["createdBy"] = _user._id;
      _payload["modifiedBy"] = _user._id;
      _payload["createdDate"] = now;
      _payload["modifiedDate"] = now;
    }

    const result = await this.MongooseModel.insertMany(_payload)
    return {status: 201, send: result}

  }


  async updateResource(_cond, _payload, _user)
  {

    const now = Date.now();
    _payload["modifiedBy"] = _user._id;
    _payload["modifiedDate"] = now;

    const result = await this.MongooseModel.updateMany(_cond, {
      $set: _payload
    })

    return {status: 201, send: result}

  }


  async deleteResource(_cond)
  {

    const delete_result = await this.MongooseModel.deleteMany(_cond)
    return {status: 201, send: delete_result}

  }
}
