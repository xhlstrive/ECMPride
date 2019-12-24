'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""',
  ANALY_API: '""',
  JAVA_API: '""',
  TEXT_API: '""'
})
