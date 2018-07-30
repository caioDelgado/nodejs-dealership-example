'use strict'

const Error = require('./errors/error')
const NotFoundError = require('./errors/not-found-error')

class ClientService {
  constructor (repository, storage) {
    this.__storage = storage
    this.__repository = repository
  }

  async find (id) {
    const client = await this.__repository.find(id)

    if (!client) {
      throw new NotFoundError(id)
    }

    return client
  }

  async create ({ name }) {
    const result = await this.__storage.create({ name })

    return result
  }
}

module.exports = ClientService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
