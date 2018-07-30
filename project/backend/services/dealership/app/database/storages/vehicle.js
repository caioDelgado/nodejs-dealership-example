'use strict'

const { pick } = require('lodash')

class OrderStorage {
  constructor (model) {
    this.__model = model
  }

  async create (params) {
    const order = pick(params, [
      'age.code',
      'age.name',
      'brand.code',
      'brand.name',
      'model.code',
      'model.name'
    ])

    return this.__model.create(order)
  }
}

module.exports = OrderStorage
