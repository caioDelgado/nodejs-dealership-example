'use strict'

const app = require('../app')
const sinon = require('sinon')
const { expect } = require('chai')
const { merge } = require('lodash')
const axiosist = require('axiosist')
const mongoose = require('mongoose')

const vehicleFixtures = require('./fixtures/vehicle')

const FipeService = require('../app/services/fipe')
const VehicleRepository = require('../app/database/repositories/vehicle')

const config = merge(
  require('../config'),
  { fipe: { url: 'http://www.fipeFixture.com/' } }
)

describe('GET /vehicles/:vehicle', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)

    sinon.stub(FipeService.prototype, 'find')
    sinon.stub(VehicleRepository.prototype, 'find')

    api = axiosist(app(config, 'testing'))
  })

  after(() => {
    mongoose.createConnection.restore()
    FipeService.prototype.find.restore()
    VehicleRepository.prototype.find.restore()
  })

  describe('when client does not exist', () => {
    let response

    before(async () => {
      VehicleRepository.prototype.find.returns(null)

      response = await api.get('/vehicles/5b5df86a4c620056f05c1280')
        .catch(err => err.response)
    })

    after(async () => {
      VehicleRepository.prototype.find.reset()
    })

    it('returns 404', async () => {
      expect(response.status).to.be.equals(404)
    })

    it('has a `not_found` error code', async () => {
      expect(response.data.error.code).to.be.equals('not_found')
    })
  })

  describe('when vehicle exists', () => {
    let response

    before(async () => {
      VehicleRepository.prototype.find.returns(vehicleFixtures)
      FipeService.prototype.find.returns({ Valor: 'R$ 200000,00' })

      // const fipe = await this.__fipeService.find(vehicle.brand.code, vehicle.model.code, vehicle.age.code)

      response = await api.get('/vehicles/5b5df86a4c620056f05c1280')
        .catch(err => err.response)
    })

    after(() => {
      VehicleRepository.prototype.find.reset()
    })

    it('returns 200', async () => {
      expect(response.status).to.be.equals(200)
    })

    it('returns an object', async () => {
      expect(response.data).to.be.an('object')
    })

    describe('the object', () => {
      it('has an `_id` property', async () => {
        expect(response.data).to.have.a.property('_id')
      })

      it('has an `brand` property', async () => {
        expect(response.data).to.have.a.property('brand')
      })

      it('has an `model` property', async () => {
        expect(response.data).to.have.a.property('model')
      })

      it('has an `age` property', async () => {
        expect(response.data).to.have.a.property('age')
      })

      it('has an `price` property', async () => {
        expect(response.data).to.have.a.property('price')
      })

      describe('the `brand` property', () => {
        it('is an object', async () => {
          expect(response.data.brand).to.be.an('object')
        })

        it('has a `code` property', async () => {
          expect(response.data.brand).to.have.a.property('code')
        })

        it('has a `name` property', async () => {
          expect(response.data.brand).to.have.a.property('name')
        })
      })

      describe('the `model` property', () => {
        it('is an object', async () => {
          expect(response.data.model).to.be.an('object')
        })

        it('has a `code` property', async () => {
          expect(response.data.model).to.have.a.property('code')
        })

        it('has a `name` property', async () => {
          expect(response.data.model).to.have.a.property('name')
        })
      })

      describe('the `age` property', () => {
        it('is an object', async () => {
          expect(response.data.age).to.be.an('object')
        })

        it('has a `code` property', async () => {
          expect(response.data.age).to.have.a.property('code')
        })

        it('has a `name` property', async () => {
          expect(response.data.age).to.have.a.property('name')
        })
      })
    })
  })
})
