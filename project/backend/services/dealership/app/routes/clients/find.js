'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@mantris/appify')

const Client = require('../../services/client')

const factory = (service) => ([
  rescue(async (req, res) => {
    const client = await service.find(req.params.client)

    res.status(200)
      .json(client)
  }),
  (err, req, res, next) => {
    if (err instanceof Client.NotFoundError) {
      return next(new HttpError.NotFound({ message: err.message }))
    }

    next(err)
  }
])

module.exports = { factory }
