'use strict'

class ClientStorage {
  constructor (model) {
    this.__model = model
  }

  async create ({ name }) {
    return this.__model.create({ name })
  }
}

module.exports = ClientStorage
