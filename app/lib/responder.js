const getValidatorErrors = validErrors => {
  return validErrors.reduce(
    (output, error) =>
      output.concat(
        error.param === '_error'
          ? getValidatorErrors(error.nestedErrors)
          : { [error.param]: error.msg }
      ),
    [] // reducer init
  )
}

const responder = res => {
  // success json responses
  const success = data => res.json(data)

  // error responses and error codes
  const error = (err, errorCode = 400) => {
    let message = err.message || 'Unknown error'

    if (err.type && err.type === 'system') {
      errorCode = 500
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(errorCode).json({
      message: message
    })
  }

  const errorString = errMessage => {
    const err = new Error(errMessage)
    const errorCode = 500
    return error(err, errorCode)
  }

  const errorValidator = error => {
    const errors = getValidatorErrors(error)

    res.status(400).json({
      message: 'Validation error',
      error: errors
    })
  }

  return {
    success,
    error,
    errorString,
    errorValidator
  }
}

module.exports = responder
