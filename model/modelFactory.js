const mongodb = require('../database/connection.js')
const {locationDatabaseSchema} = require('./schema/location.js')
const {emailDatabaseSchema} = require('./schema/email.js')
const {customerDatabaseSchema} = require('./schema/customer.js')
const {loginDatabaseSchema} = require('./schema/login.js')
const {addressDatabaseSchema} = require('./schema/address.js')


const Location = mongodb.model('Location', locationDatabaseSchema)
const Customer = mongodb.model('Customer', customerDatabaseSchema)
const Email = mongodb.model('Email', emailDatabaseSchema)
const Login = mongodb.model('Login', loginDatabaseSchema)
const Address = mongodb.model('Address', addressDatabaseSchema)

module.exports = {Customer, Email, Location, Login, Address}
