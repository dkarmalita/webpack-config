#!/usr/bin/env node

'use strict';
//ref: https://webpack.js.org/configuration/stats/

const webpack = require('webpack');
const buildconfig = require('../config/build');

const statsConfig = buildconfig.stats || {
    modules: false,
    colors: true,
}

const compiler = webpack(buildconfig,
(err, stats) => {

    if(err) {
        console.log(err);
        return
    }

    if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({
            errorDetails: true,
            warnings: true,
            colors: true
        }))
        return
    }

    console.log(stats.toString(buildconfig.stats));
})


// const compiler = webpack(buildconfig);
// compiler.run((err, stats) => {

//     if(err) {
//         console.log(err);
//         return
//     }

//     if (stats.hasErrors() || stats.hasWarnings()) {
//         console.log(stats.toString({
//             errorDetails: true,
//             warnings: true,
//             colors: true
//         }))
//         return
//     }

//     console.log(stats.toString({
//             modules: false,
//             colors: true
//     }));
// })
