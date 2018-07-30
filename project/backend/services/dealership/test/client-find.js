'use strict'

const app = require('../app')
const sinon = require('sinon')
const { expect } = require('chai')
const config = require('../config')
const axiosist = require('axiosist')
const mongoose = require('mongoose')

const clientFixture = require('./fixtures/client')

const ClientRepository = require('../app/database/repositories/client')

describe('GET /clients/:client', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)

    sinon.stub(ClientRepository.prototype, 'find')

    api = axiosist(app(config, 'testing'))
  })

  after(() => {
    mongoose.createConnection.restore()
    ClientRepository.prototype.find.restore()
  })

  describe('when client does not exist', () => {
    let response

    before(async () => {
      ClientRepository.prototype.find.returns(null)

      response = await api.get('/clients/5b5de7215e7ecf1a7ed66273')
        .catch(err => err.response)
    })

    after(async () => {
      ClientRepository.prototype.find.reset()
    })

    it('returns 404', async () => {
      expect(response.status).to.be.equals(404)
    })

    it('has a `not_found` error code', async () => {
      expect(response.data.error.code).to.be.equals('not_found')
    })
  })

  describe('when client exists', () => {
    let response

    before(async () => {
      ClientRepository.prototype.find.returns(clientFixture)

      response = await api.get('/clients/5b5de7215e7ecf1a7ed66273')
        .catch(err => err.response)
    })

    after(async () => {
      ClientRepository.prototype.find.reset()
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

      it('has an `name` property', async () => {
        expect(response.data).to.have.a.property('name')
      })
    })
  })
})
