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
      age: {
        type: 'object',
        properties: {
          code: {
            type: 'string'
          },
          name: {
            type: 'string'
          }
        },
        required: [ 'code', 'name' ]
      },
      brand: {
        type: 'object',
        properties: {
          code: {
            type: 'number'
          },
          name: {
            type: 'string'
          }
        },
        required: [ 'code', 'name' ]
      },
      model: {
        type: 'object',
        properties: {
          code: {
            type: 'number'
          },
          name: {
            type: 'string'
          }
        },
        required: [ 'code', 'name' ]
      }
    },
    required: [ 'age', 'brand', 'model' ]
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

