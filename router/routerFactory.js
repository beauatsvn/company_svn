const SchemaRouter = require('./SchemaRouter.js')
const ObjectRouter = require('./ObjectRouter.js')
const AuthRouter = require('./AuthRouter.js')


const ResourceObject = require('../resource/ResourceObject.js')
const BaseObject = require('../resource/BaseObject.js')
const MasterObject = require('../resource/MasterObject.js')
const AuthObject = require('../resource/AuthObject.js')
const RegObject = require('../resource/RegObject.js')


const {Customer, Email, Location, Address, Login} = require('../model/modelFactory.js')
const {customerRouterSchema} = require('./schema/customer.js')
const {emailRouterSchema} = require('./schema/email.js')
const {locationRouterSchema} = require('./schema/location.js')
const {addressRouterSchema} = require('./schema/address.js')
const {customerMasterRouterSchema} = require('./schema/customerMaster.js')
const {loginRouterSchema} = require('./schema/login.js')


const indexRouter = new ObjectRouter(new BaseObject())
const customerRouter = new SchemaRouter(customerRouterSchema, new ResourceObject(Customer))
const emailRouter = new SchemaRouter(emailRouterSchema, new ResourceObject(Email))
const locationRouter = new SchemaRouter(locationRouterSchema, new ResourceObject(Location))
const regRouter = new AuthRouter(loginRouterSchema, new RegObject(Login))
const authRouter = new AuthRouter(loginRouterSchema, new AuthObject(Login))


const customerMasterObject = new MasterObject(new ResourceObject(Customer), "customer")
customerMasterObject.addDetailResource("email", new ResourceObject(Email), "customerId")
customerMasterObject.addDetailResource("location", new ResourceObject(Location), "customerId")


const customerMasterRouter = new SchemaRouter(customerMasterRouterSchema, customerMasterObject)


module.exports = {indexRouter, customerRouter, emailRouter, locationRouter, customerMasterRouter, regRouter, authRouter}
