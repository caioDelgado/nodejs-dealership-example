'use strict'

const env = require('sugar-env')

module.exports = {
  mongodb: {
    uri: env.get('MONGODB_URI')
  },
  fipe: {
    url: env.get('FIPE_URL'),
    timeout: parseInt(env.get('FIPE_TIMEOUT', 30000))
  }
}
