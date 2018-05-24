// extract the validation error messages
const getValidatorErrors = validErrors => {
  const errors = validErrors.array()

  return errors.reduce(
    (output, error) =>
      output.concat(
        error.param === '_error'
          ? getValidatorErrors(error.nestedErrors)
          : { [error.param]: error.msg }
      ),
    [] // reducer init
  )
}

const responderMiddleware = (req, res, next) => {
  // return a success message in json
  res.success = data => res.json(data)
  // return an error response in json
  res.error = (err, errorCode = 400) => {
    let message = err.message || 'Unknown error'

    if (err.type && err.type === 'system') {
      errorCode = 500
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(errorCode).json({
      message: message
    })
  }
  // return an error resposne from a string
  res.errorString = errMessage => {
    const err = new Error(errMessage)
    const errorCode = 500
    return res.error(err, errorCode)
  }
  // handle multiple errors from validation failure
  res.validatorError = error => {
    const errors = getValidatorErrors(error)

    res.status(400).json({
      message: 'Validation error',
      error: errors
    })
  }

  next()
}

module.exports = responderMiddleware
