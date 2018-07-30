'use strict'

const { Schema } = require('mongoose')

const properties = {
  brand: {
    code: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  model: {
    code: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  age: {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}

const options = {
  collection: 'vehicles',
  id: false,
  safe: true,
  strict: true,
  versionKey: false,
  timestamps: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('Vehicle', schema)
}

module.exports = schema
module.exports.factory = factory
