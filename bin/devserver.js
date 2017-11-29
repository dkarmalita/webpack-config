#!/usr/bin/env node
/**
 * @fileoverview Eslint CLI default configuration utility.
 * @author Dmitriy Karmalita
 *
 * Note: babel & webpack stacks are required.
 */
/* eslint no-console: 0 */
'use strict'

// doc refs:
// * https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack/devserver')

const compiler = Webpack(webpackConfig)

const devServerOptions = webpackConfig.devServer
const host = devServerOptions.host || '127.0.0.1'
const port = devServerOptions.port || 8080

devServerOptions.stats = devServerOptions.stats || {}
devServerOptions.stats.colors = (devServerOptions.stats.colors !== false)

const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(port, host, () => {

    console.log('Starting server on ' + host + ':' + port)

})
