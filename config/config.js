//Setup environment
const config = require('./default.json')
global.gConfig = config[process.env.NODE_ENV||'development']

console.log(`global.gConfig: ${JSON.stringify(global.gConfig)}`)
