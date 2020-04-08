'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev-remote.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
