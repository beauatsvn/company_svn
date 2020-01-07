const mongoose = require('mongoose')

exports.addressDatabaseSchema = new mongoose.Schema({
  addressType: {type: String, required: true},
  addressValue: {type: String, required: true},
  customerId: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdDate: {type: Date, required: true},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  modifiedDate: {type: Date, required: true}
})
