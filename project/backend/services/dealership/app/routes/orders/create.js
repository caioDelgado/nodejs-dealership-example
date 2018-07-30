'use strict'

const rescue = require('express-rescue')
const { validate } = require('@mantris/appify')

const factory = (service) => ([
  /**
   * Validating request payload
   * ==========================
   */
  validate({
    type: 'object',
    properties: {
      client: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          }
        },
        required: [ '_id' ]
      },
      vehicle: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          }
        },
        required: [ '_id' ]
      },
      price: {
        type: 'number'
      }
    },
    required: [ 'client', 'vehicle', 'price' ]
  }),

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const { _id } = await service.create(req.body)

    res.status(201)
       .json({ _id })
  })
])

module.exports = { factory }

