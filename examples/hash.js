const crypto = require('crypto')

// sha1
console.log(
  crypto
    .createHash('sha1')
    .update('hello world')
    .digest('hex')
)

// md5
console.log(
  crypto
    .createHash('md5')
    .update('hello world')
    .digest('hex')
)
