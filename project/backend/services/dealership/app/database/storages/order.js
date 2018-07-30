'use strict'

const { pick } = require('lodash')

class OrderStorage {
  constructor (model) {
    this.__model = model
  }

  async create (params) {
    const order = pick(params, [
      'price',
      'client._id',
      'client.name',
      'vehicle._id',
      'vehicle.age.code',
      'vehicle.age.name',
      'vehicle.brand.code',
      'vehicle.brand.name',
      'vehicle.model.code',
      'vehicle.model.name'
    ])

    return this.__model.create(order)
  }
}

module.exports = OrderStorage
