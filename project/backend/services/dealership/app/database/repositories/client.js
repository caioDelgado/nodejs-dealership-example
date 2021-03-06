'use strict'

class ClientRepository {
  constructor (model) {
    this.__model = model
  }

  async find (id) {
    return this.__model.findOne({ _id: id })
      .lean()
  }
}

module.exports = ClientRepository
