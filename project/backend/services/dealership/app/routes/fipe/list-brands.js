'use strict'

const rescue = require('express-rescue')

const factory = (service) => ([
  rescue(async (req, res) => {
    const brands = await service.listBrands()

    res.status(200)
      .json(brands)
  })
])

module.exports = { factory }
