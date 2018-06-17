const bodyParser = require('body-parser')

const isEmpty = data => {
  return data.constructor === Object && Object.keys(data).length === 0
}

const defaultParser = (req, res, next) => {
  const jsonParser = bodyParser.json({
    limit: '100kb'
  })
  jsonParser(req, res, err => {
    if (err) {
      // must be valid JSON sent with content type JSON
      return res.errorString('Failed to process JSON request')
    }

    // ensure body is not empty
    const { body = {} } = req
    if (isEmpty(body)) {
      // should always have a body
      return res.errorString('No request data found')
    }

    // go to next
    next()
  })
}

module.exports = {
  defaultParser
}
