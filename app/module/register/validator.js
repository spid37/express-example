const { check } = require('express-validator/check')
const validator = require('./../../middleware/validator')

const registerAccount = [
  check('mobileNumber', 'is required')
    .not()
    .isEmpty()
]

const validators = { registerAccount }

module.exports = validator.loadValidators(validators)
