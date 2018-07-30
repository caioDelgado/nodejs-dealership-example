'use strict'

const mongoose = require('mongoose')

// Models
const orderModel = require('./models/order')
const clientModel = require('./models/client')
const vehicleModel = require('./models/vehicle')

// Repositories
const OrderRepository = require('./repositories/order')
const ClientRepository = require('./repositories/client')
const VehicleRepository = require('./repositories/vehicle')

// Storages
const OrderStorage = require('./storages/order')
const ClientStorage = require('./storages/client')
const VehicleStorage = require('./storages/vehicle')

const factory = ({ uri }) => {
  const connection = mongoose.createConnection(uri)

  const models = {
    Order: orderModel.factory(connection),
    Client: clientModel.factory(connection),
    Vehicle: vehicleModel.factory(connection)
  }

  const repositories = {
    order: new OrderRepository(models.Order),
    client: new ClientRepository(models.Client),
    vehicle: new VehicleRepository(models.Vehicle)
  }

  const storages = {
    order: new OrderStorage(models.Order),
    client: new ClientStorage(models.Client),
    vehicle: new VehicleStorage(models.Vehicle)
  }

  return { repositories, storages }
}

module.exports = { factory }
