#!/usr/bin/env node
/**
 * @fileoverview Webpack CLI default configuration utility.
 * @author Dmitriy Karmalita
 *
 * Note: babel & webpack stacks are required.
 */
/* eslint no-console: 0 */
'use strict'

// doc refs:
// * https://webpack.js.org/configuration/stats/

const webpack = require('webpack')
const buildconfig = require('../config/webpack/build')

const statsConfig = buildconfig.stats || {
    modules: false,
    colors: true,
}

const errorStatsConfig = {
    errorDetails: true,
    warnings: true,
    colors: true,
}

const compile = async () => webpack(buildconfig,
    (err, stats) => {

        if (err) {

            console.log(err)

            return

        }

        if (stats.hasErrors() || stats.hasWarnings()) {

            console.log(stats.toString(errorStatsConfig))

            return

        }

        console.log(stats.toString(statsConfig))

    })

compile()
