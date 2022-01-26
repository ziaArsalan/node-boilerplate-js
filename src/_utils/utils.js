const crypto = require('crypto')

const getUniqueId = (length = 8) => {
    return crypto.randomBytes(length/2).toString('hex')
}

module.exports = {
    getUniqueId
}