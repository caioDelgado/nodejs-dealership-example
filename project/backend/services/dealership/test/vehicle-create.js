'use strict'

const sinon = require('sinon')
const { expect } = require('chai')
const axiosist = require('axiosist')
const mongoose = require('mongoose')

const app = require('../app')
const config = require('../config')

const vehicleFixture = require('./fixtures/vehicle')
const VehicleStorage = require('../app/database/storages/vehicle')

describe('POST /clients', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)

    sinon.stub(VehicleStorage.prototype, 'create')

    api = axiosist(app(config, 'testing'))
  })

  after(() => {
    mongoose.createConnection.restore()

    VehicleStorage.prototype.create.restore()
  })

  describe('when required properties are missing', () => {
    let response

    before(async () => {
      VehicleStorage.prototype.create.returns(null)

      response = await api.post('/vehicles', {})
        .catch(err => err.response)
    })

    after(() => {
      VehicleStorage.prototype.create.reset()
    })

    it('returns 422', async () => {
      expect(response.status).to.be.equals(422)
    })

    it('returns `unacceptable_payload_schema` error', async () => {
      expect(response.data.error.code).to.be.equals('unacceptable_payload_schema')
    })
  })

  describe('when client is created with success', () => {
    let response

    before(async () => {
      VehicleStorage.prototype.create.returns(vehicleFixture)

      const params = {
        age: {
          code: '1992-1',
          name: '1992 Gasolina'
        },
        brand: {
          code: 1,
          name: 'Acura'
        },
        model: {
          code: 1,
          name: 'Integra GS 1.8'
        }
      }

      response = await api.post('/vehicles', params)
        .catch(err => err.response)
    })

    after(() => {
      VehicleStorage.prototype.create.reset()
    })

    it('returns 201', async () => {
      expect(response.status).to.be.equals(201)
    })

    it('returns an object', async () => {
      expect(response.data).to.be.an('object')
    })

    describe('the object', () => {
      it('has a `_id` property', async () => {
        expect(response.data).to.have.a.property('_id')
      })
    })
  })
})
