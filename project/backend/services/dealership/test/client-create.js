'use strict'

const sinon = require('sinon')
const { expect } = require('chai')
const axiosist = require('axiosist')
const mongoose = require('mongoose')

const app = require('../app')
const config = require('../config')

const clientFixture = require('./fixtures/client')
const ClientStorage = require('../app/database/storages/client')

describe('POST /clients', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)

    sinon.stub(ClientStorage.prototype, 'create')

    api = axiosist(app(config, 'testing'))
  })

  after(() => {
    mongoose.createConnection.restore()

    ClientStorage.prototype.create.restore()
  })

  describe('when required properties are missing', () => {
    let response

    before(async () => {
      ClientStorage.prototype.create.returns(null)

      response = await api.post('/clients', {})
        .catch(err => err.response)
    })

    after(() => {
      ClientStorage.prototype.create.reset()
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
      ClientStorage.prototype.create.returns(clientFixture)

      response = await api.post('/clients', { name: 'João Client teste da Silva' })
        .catch(err => err.response)
    })

    after(() => {
      ClientStorage.prototype.create.reset()
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
