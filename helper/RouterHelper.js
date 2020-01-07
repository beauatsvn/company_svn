const jwt = require('jsonwebtoken')
const mongoose = require('../database/connection.js')
const Joi = require('@hapi/joi')

module.exports = class RouterHelper {

  static getUser(_token)
  {
    if(_token) return jwt.verify(_token, process.env.svn_jwtPrivateKey)

  }

  static asTransaction(_func)
  {
    return async function()
    {
      let session = null;
      try {
        session = await mongoose.startSession();
        session.startTransaction();
        const func = await _func.apply(this, arguments)
        return func
        await session.commitTransaction();
      } catch (err) {
        console.error(err.message)
        await session.abortTransaction();
        return {status: 500, send: `Server error: ${err}`}
      }
    }
  }

  static authTokenCheck(_token, _func)
  {
    return async function()
    {
      if (!_token) return {status: 401, send: 'Access denied. Not authorised'}

      try{
        const decoded = jwt.verify(_token, process.env.svn_jwtPrivateKey)
      } catch (err) {
        console.error(err.message)
        return {status: 400, send: 'Invalid token.'}
      }

      // console.log('Function called')
      // console.log(_func.toString())
      const func = await _func.apply(this, arguments)
      return func
    }
  }

  static tryCatchLog(_func)
  {

    return async function()
    {
      try{
        // console.log('Function called')
        // console.log(_func.toString())
        const func = await _func.apply(this, arguments)
        return func

      }
      catch(err){
        console.error(err.message)
        return {status: 500, send: 'Internal Server Error!!!'}
      }
    }

  }

  static reqSchemaValidator(_json, _schema, _func)
  {

    return async function ()
    {

      const validationResult = _schema.validate(_json)

      if(validationResult.error){

        return {status: 400, send: `Bad request: ${validationResult.error.details[0]}`}

      }

      // console.log('Function called')
      // console.log(_func.toString())
      const func = await _func.apply(this, arguments)
      return func
    }

  }

  static objectIdValidator(_id, _func)
  {

    return async function()
    {
      const objectIdType = mongoose.Types.ObjectId
      if(objectIdType.isValid(_id)){

        // console.log('Function called')
        // console.log(_func.toString())
        const func = await _func.apply(this, arguments)
        return func

      } else return {status:400, send: 'Invalid resource Id'}
    }

  }

}
