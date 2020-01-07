const mongoose = require('mongoose')

exports.customerDatabaseSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: { type: Date, default: '1900-01-01'},
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  createdDate: {type: Date, required: true},
  modifiedBy: {type: mongoose.Schema.Types.ObjectId, required: true},
  modifiedDate: {type: Date, required: true}
})
