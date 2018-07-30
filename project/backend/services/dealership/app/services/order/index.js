'use strict'

const Error = require('./errors/error')
const NotFoundError = require('./errors/not-found-error')

class OrderService {
  constructor (repository, storage, clientService, vehicleService) {
    this.__storage = storage
    this.__repository = repository
    this.__clientService = clientService
    this.__vehicleService = vehicleService
  }

  async find (id) {
    const order = await this.__repository.find(id)

    if (!order) {
      throw new NotFoundError(id)
    }

    return order
  }

  async create ({ client: { _id: clientId }, vehicle: { _id: vehicleId }, price }) {
    const vehicle = await this.__vehicleService.find(vehicleId)
    const client = await this.__clientService.find(clientId)

    const order = {
      client,
      vehicle,
      price
    }

    const result = await this.__storage.create(order)

    return result
  }
}

module.exports = OrderService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
