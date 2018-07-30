'use strict'

module.exports = {
  client: {
    find: require('./clients/find'),
    create: require('./clients/create')
  },
  vehicle: {
    find: require('./vehicles/find'),
    create: require('./vehicles/create')
  },
  order: {
    find: require('./orders/find'),
    create: require('./orders/create')
  },
  fipe: {
    listBrands: require('./fipe/list-brands'),
    listModels: require('./fipe/list-models'),
    listAges: require('./fipe/list-ages'),
    find: require('./fipe/find')
  }
}
