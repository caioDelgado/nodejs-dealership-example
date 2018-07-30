'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@mantris/appify')

const Vehicle = require('../../services/vehicle')

const factory = (service) => ([
  rescue(async (req, res) => {
    const vehicle = await service.find(req.params.vehicle)

    res.status(200)
      .json(vehicle)
  }),
  (err, req, res, next) => {
    if (err instanceof Vehicle.NotFoundError) {
      return next(new HttpError.NotFound({ message: err.message }))
    }

    next(err)
  }
])

module.exports = { factory }
