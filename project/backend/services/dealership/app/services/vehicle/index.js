'use strict'

const Error = require('./errors/error')
const NotFoundError = require('./errors/not-found-error')

class VehicleService {
  constructor (repository, storage, fipeService) {
    this.__storage = storage
    this.__repository = repository
    this.__fipeService = fipeService
  }

  async find (id) {
    const vehicle = await this.__repository.find(id)

    if (!vehicle) {
      throw new NotFoundError(id)
    }

    const fipe = await this.__fipeService.find(vehicle.brand.code, vehicle.model.code, vehicle.age.code)

    return Object.assign({}, vehicle, { price: fipe.Valor })
  }

  async create (params) {
    const result = await this.__storage.create(params)

    return result
  }
}

module.exports = VehicleService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
