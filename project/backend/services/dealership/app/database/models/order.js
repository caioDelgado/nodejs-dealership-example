'use strict'

const { Schema } = require('mongoose')

const properties = {
  client: {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  vehicle: {
    _id: {
      type: String,
      required: true
    },
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
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}

const options = {
  collection: 'orders',
  id: false,
  safe: true,
  strict: true,
  versionKey: false,
  timestamps: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('Order', schema)
}

module.exports = schema
module.exports.factory = factory
