const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const loginDatabaseSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, minlength: 6, maxlength: 50},
  password: {type: String, required: true, minlength: 6, maxlength: 1024},
  lastPasswordChangeDate: {type: Date, default: Date.now()}
})

loginDatabaseSchema.methods.generateAuthToken = function()
{
  const token = jwt.sign({_id: this._id}, process.env.svn_jwtPrivateKey)
  return token
}

loginDatabaseSchema.methods.encryptPassword = async function()
{
  const salt = await bcrypt.genSalt(17)
  this.password = await bcrypt.hash(this.password, salt)
}

loginDatabaseSchema.methods.checkPassword = async function(_password)
{
  return await bcrypt.compare(_password, this.password)
}

loginDatabaseSchema.methods.checkAuth = function(__token)
{
  return jwt.verify(_token, process.env.svn_jwtPrivateKey)
}

module.exports = {loginDatabaseSchema}
