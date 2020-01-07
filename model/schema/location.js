const mongoose = require('mongoose')

exports.locationDatabaseSchema = new mongoose.Schema({
  locationType: {type: String, required: true},
  addressLine1: String,
  addressLine2: String,
  suburb: {type: String, required: true},
  state: {type: String, required: true},
  postcode: {type: String, required: true},
  customerId: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdDate: {type: Date, required: true},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  modifiedDate: {type: Date, required: true}
})
