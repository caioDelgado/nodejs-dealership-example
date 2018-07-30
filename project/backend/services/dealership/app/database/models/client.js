'use strict'

const { Schema } = require('mongoose')

const properties = {
  name: {
    type: String,
    required: true
  }
}

const options = {
  collection: 'clients',
  id: false,
  safe: true,
  strict: true,
  versionKey: false,
  timestamps: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('Client', schema)
}

module.exports = schema
module.exports.factory = factory
