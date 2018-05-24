const { validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

const checkErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.validatorError(errors)
  }

  req.validatedData = matchedData(req)
  next()
}

const loadValidators = validators => {
  const validate = validatorName => {
    if (!validators[validatorName]) {
      throw new Error('invalid validator')
    }

    // add checkErrors to the array of validators
    // this will do the error check after the validation
    validators[validatorName].push(checkErrors)
    return validators[validatorName]
  }

  return { validate }
}

module.exports = { loadValidators }
