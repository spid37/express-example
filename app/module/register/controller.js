const RegisterController = () => {
  const registerAccount = async (req, res) => {
    const { mobileNumber } = req.validatedData

    try {
      const registerResponse = await _registerAccount(mobileNumber)
      console.log('RESPONSE', registerResponse)
      const response = { message: 'OK', data: registerResponse }
      res.success(response)
    } catch (e) {
      res.error(e)
    }
  }

  const _registerAccount = mobileNumber => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var d = new Date()
        var seconds = Math.round(d.getTime() / 1000)

        if (seconds % 2 === 0) {
          resolve({ mobileNumber })
        } else {
          reject(Error('Failed because second is odd'))
        }
      }, 3000)
    })
  }

  return {
    registerAccount
  }
}

module.exports = RegisterController
