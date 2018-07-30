'use strict'

const routes = require('./routes')
const database = require('./database')
const appify = require('@mantris/appify')

// Services
const FipeService = require('./services/fipe')
const OrderService = require('./services/order')
const ClientService = require('./services/client')
const VehicleService = require('./services/vehicle')

module.exports = appify((app, config) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const fipeService = new FipeService(config.fipe)
  const clientService = new ClientService(repositories.client, storages.client)
  const vehicleService = new VehicleService(repositories.vehicle, storages.vehicle, fipeService)
  const orderService = new OrderService(repositories.order, storages.order, clientService, vehicleService)

  app.get('/brands', routes.fipe.listBrands.factory(fipeService))
  app.get('/brands/:brand/models', routes.fipe.listModels.factory(fipeService))
  app.get('/brands/:brand/models/:model/ages', routes.fipe.listAges.factory(fipeService))
  app.get('/brands/:brand/models/:model/ages/:age', routes.fipe.find.factory(fipeService))

  app.post('/vehicles', routes.vehicle.create.factory(vehicleService))
  app.get('/vehicles/:vehicle', routes.vehicle.find.factory(vehicleService))

  app.post('/orders', routes.order.create.factory(orderService))
  app.get('/orders/:order', routes.order.find.factory(orderService))

  app.post('/clients', routes.client.create.factory(clientService))
  app.get('/clients/:client', routes.client.find.factory(clientService))
})
