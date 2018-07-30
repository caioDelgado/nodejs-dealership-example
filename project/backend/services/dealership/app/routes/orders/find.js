'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@mantris/appify')

const Order = require('../../services/order')

const factory = (service) => ([
  rescue(async (req, res) => {
    const order = await service.find(req.params.order)

    res.status(200)
      .json(order)
  }),
  (err, req, res, next) => {
    if (err instanceof Order.NotFoundError) {
      return next(new HttpError.NotFound({ message: err.message }))
    }

    next(err)
  }
])

module.exports = { factory }
