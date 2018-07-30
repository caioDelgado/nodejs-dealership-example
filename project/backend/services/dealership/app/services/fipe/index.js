'use strict'

const axios = require('axios')
const Error = require('./errors/error')
const NotFoundError = require('./errors/not-found-error')
const UnresponsiveServiceError = require('./errors/unresponsive-service-error')

const errorHandler = (err) => {
  if (err.response.status === 404) {
    throw new NotFoundError(err.message)
  }

  if (!err.response) {
    throw new UnresponsiveServiceError(err.message)
  }

  throw new Error(err.message, err.stack)
}

class FipeService {
  constructor ({ url, timeout, apiKey }) {
    this.__client = axios.create({
      baseURL: url,
      timeout,
      params: {
        apikey: apiKey
      }
    })
  }

  async listBrands () {
    const response = await this.__client.get('carros/marcas')
      .catch(errorHandler)

    return response.data
  }

  async listModels (brand) {
    const response = await this.__client.get(`carros/marcas/${brand}/modelos`)
      .catch(errorHandler)

    return response.data.modelos
  }

  async listAges (brand, model) {
    const response = await this.__client.get(`carros/marcas/${brand}/modelos/${model}/anos`)
      .catch(errorHandler)

    return response.data
  }

  async find (brand, model, age) {
    const response = await this.__client.get(`carros/marcas/${brand}/modelos/${model}/anos/${age}`)
      .catch(errorHandler)

    return response.data
  }
}

module.exports = FipeService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
