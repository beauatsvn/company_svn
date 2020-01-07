const mongoose = require('mongoose')

exports.emailDatabaseSchema = new mongoose.Schema({
  emailType: String,
  value: {type: String, required: true},
  customerId: {type: mongoose.Schema.Types.ObjectId},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdDate: {type: Date, required: true},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  modifiedDate: {type: Date, required: true}
})
