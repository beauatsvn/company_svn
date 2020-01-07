const DataObjectInterface = require('./DataObjectInterface')
const RouterHelper = require('../helper/RouterHelper.js')
const _ = require('lodash')

module.exports = class MasterObject extends DataObjectInterface
{
  constructor(_masterObject, _masterName)
  {

    super();

    this.masterObject = _masterObject;
    this.masterName = _masterName;
    this.detailObjects = {};
    this.linkKeys = {}
    this.addDetailResource = this.addDetailResource.bind(this)
    this.getResource = this.getResource.bind(this)
    this.addResource = this.addResource.bind(this)
    this.updateResource = this.updateResource.bind(this)
    this.deleteResource = this.deleteResource.bind(this)

  }

  addDetailResource(_newKey, _newResourceObject, _linkKey)
  {
    this.detailObjects[_newKey] = _newResourceObject;
    this.linkKeys[_newKey] = _linkKey
  }


  async getResource(_cond, _skip, _limit)
  {

      let masterObjects = await this.masterObject.getResource(_cond, _skip, _limit)
      masterObjects = masterObjects.send

      const masterDetailObjects = await Promise.all(_.map(masterObjects, async (object) => {

        let masterDetail = {}
        masterDetail[this.masterName] = object

        await Promise.all(Object.keys(this.detailObjects).map(async (key) => {

          const linkKey = this.linkKeys[key];
          let cond = {}
          cond[linkKey] = object._id;

          const result = await this.detailObjects[key].getResource(cond, undefined, undefined)
          masterDetail[key] = result.send

        }))

        return masterDetail

      }))
      return {status: 200, send: masterDetailObjects}
  }

  async addResource(_payload, _user)
  {
      const master = _payload[this.masterName]

      const newMaster = await this.masterObject.addResource(master, _user)

      let masterDetail = {}

      await Promise.all(_.map(newMaster.send, async (object) => {

        masterDetail[this.masterName] = object

        await Promise.all(Object.keys(this.detailObjects).map(async (key) => {

          const linkKey = this.linkKeys[key]

          if(_payload[key])
          {
            _payload[key].map((item) => {
              item[linkKey] = object._id.toString()
            })
          }

          const newDetail = await this.detailObjects[key].addResource(_payload[key], _user)

          masterDetail[key] = newDetail.send

        }))
      }))

      return {status: 201, send: masterDetail}
  }

  async updateResource(_id, _payload, _user)
  {

    const master = _payload[this.masterName]

    const newMaster = await this.masterObject.updateResource({_id: _id}, master, _user)

    let masterDetail = {}
    masterDetail[this.masterName] = newMaster.send

    await Promise.all(Object.keys(this.detailObjects).map(async (key) => {

      let cond = {}
      cond[this.linkKeys[key]] = _id

      _payload[key].map((item) => {

        item[this.linkKeys[key]] = _id

      })

      const oldDetail = await this.detailObjects[key].deleteResource(cond)
      const newDetail = await this.detailObjects[key].addResource(_payload[key], _user)

      oldDetail.send["insertedCount"] = newDetail.send.length
      oldDetail.send["n"] = oldDetail.send["deletedCount"] + newDetail.send.length

      masterDetail[key] = oldDetail.send

    }))

    return {status: 201, send: masterDetail}
  }

  async deleteResource(_id)
  {

    const master = await this.masterObject.deleteResource({_id: _id})

    let masterDetail = {}
    masterDetail[this.masterName] = master.send

    await Promise.all(_.map(this.detailObjects, async (object, key) => {

      let cond = {}
      cond[this.linkKeys[key]] = _id
      const detail = await object.deleteResource(cond)

      masterDetail[key] = detail.send

    }))

    return {status: 201, send: masterDetail}
  }
}
