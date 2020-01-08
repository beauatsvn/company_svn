//Configure the environment
require('./config/config.js')

if(!process.env.svn_jwtPrivateKey) {
  console.log('SERVER FAILED: jwtPrivateKey is not defined.')
  process.exit(1)
}


//Import required components
const express = require('express')
const morgan = require('morgan')
const {regRouter, authRouter} = require('./router/routerFactory.js')


const auth = express()


auth.use(express.json())
if(process.env.NODE_ENV === 'development')
{
  auth.use(morgan('tiny'))
  auth.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
}
auth.use('/reg', regRouter.getRouter())
auth.use('/auth', authRouter.getRouter())


auth.listen(global.gConfig.auth_port, () => {

  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Listening on port ${global.gConfig.auth_port}!`)

})
