//Configure the environment
require('./config/config.js')

if(!process.env.svn_jwtPrivateKey) {
  console.log('SERVER FAILED: jwtPrivateKey is not defined.')
  process.exit(1)
}


//Import required components
const express = require('express')
const morgan = require('morgan')
const {indexRouter, customerRouter, emailRouter, locationRouter, customerMasterRouter} = require('./router/routerFactory.js')

const app = express()


app.use(express.json())
if(process.env.NODE_ENV === 'development') app.use(morgan('tiny'))
app.use('/', indexRouter.getRouter())
app.use('/customers',customerRouter.getRouter())
app.use('/customermaster',customerMasterRouter.getRouter())
app.use('/emails', emailRouter.getRouter())
app.use('/locations', locationRouter.getRouter())


app.listen(global.gConfig.node_port, () => {

  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Listening on port ${global.gConfig.node_port}!`)

})
