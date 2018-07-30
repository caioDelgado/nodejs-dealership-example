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
      name: {
        type: 'string'
      }
    },
    required: [ 'name' ]
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
