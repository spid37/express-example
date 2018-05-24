const express = require('express')
const app = express()

// middleware
const morgan = require('morgan')
const responserMiddelware = require('./middleware/responser')

// add middleware
// http logging
app.use(morgan('combined'))
// custom responders
app.use(responserMiddelware)

// require modules
const register = require('./module/register')

// add modules to express
app.use('/register', register())

// set the port
const { PORT: port = 8008 } = process.env

const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('mobile app listening at http://%s:%s', host, port)
})
