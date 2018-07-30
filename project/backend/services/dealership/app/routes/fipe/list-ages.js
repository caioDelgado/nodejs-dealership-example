'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@mantris/appify')

const Fipe = require('../../services/fipe')

const factory = (service) => ([
  rescue(async (req, res) => {
    const models = await service.listAges(req.params.brand, req.params.model)

    res.status(200)
      .json(models)
  }),
  (err, req, res, next) => {
    if (err instanceof Fipe.NotFoundError) {
      return next(new HttpError.NotFound({ message: err.message }))
    }

    next(err)
  }
])

module.exports = { factory }
