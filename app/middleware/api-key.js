const getApiKey = req => {
  const auth = req.get('authorization')
  if (!auth) {
    throw new Error('No apikey found in header')
  }
  const [name, value] = auth.split(' ')
  if (name.toLowerCase() !== 'apikey' || !value) {
    throw new Error('No apikey found in header')
  }

  return value
}

const handleApiKey = (req, res, next) => {
  let apiKey = ''
  try {
    apiKey = getApiKey(req)
  } catch (e) {
    res.error(e, 403)
    return
  }

  // verify api key here!

  req.apiKey = apiKey
  next()
}

module.exports = handleApiKey
