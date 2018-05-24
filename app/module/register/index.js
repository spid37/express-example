const express = require('express')
const router = express.Router()

const bodyParser = require('../../middleware/body-parser')
const RegisterController = require('./controller')
const validator = require('./validator')

const Register = () => {
  const controller = RegisterController()

  return router.post(
    '/',
    bodyParser.defaultParser,
    validator.validate('registerAccount'),
    controller.registerAccount
  )
}

module.exports = Register
