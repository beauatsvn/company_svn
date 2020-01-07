
const mongoose = require('mongoose')
const engine = `${global.gConfig.database}/${global.gConfig.schema}`

mongoose.connect(engine, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('Connected to database...'))
.catch(err => console.error('Could not connect to database...',err))

module.exports = mongoose
