/* eslint no-console: 0 */

// Set environment variable to use by React & Babel
// ------------------------------------------------
// refs:  https://babeljs.io/docs/usage/babelrc/#env-option
//        http://stackoverflow.com/a/36285479
//        https://facebook.github.io/react/docs/optimizing-performance.html#webpack
process.env.NODE_ENV = 'production';

// Execute common initialization and import vars
// ---------------------------------------------
const {
    config, // common part of config
    statPath, // path to static content (resolved)
    distPath, // Target path for distribution to generate
    rootPath, // Root of the project
} = require('./common');

// Import required webpack packages
// --------------------------------
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
// plugin to remove/clean build folder(s) before building
// https://github.com/johnagan/clean-webpack-plugin

const CopyWebpackPlugin = require('copy-webpack-plugin');
// A webpack plugin that copies individual files or
// entire directories to the build directory.

const CompressionPlugin = require('compression-webpack-plugin');
// Description: https://github.com/webpack-contrib/compression-webpack-plugin
// Potential gain: https://gist.github.com/Restuta/cda69e50a853aa64912d

//config.devtool = 'source-map';
config.output.filename = '[name].[hash:6].js';
config.output.chunkFilename = "async.[id].[hash:6].js";
config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        debug: false,
        sourceMap: true,
        output: {
            comments: false
        },
        compressor: {
            warnings: false
        }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new CopyWebpackPlugin([
        // Copy glob results (with dot files) to /absolute/path/
        { from: statPath, to: '' }
    ], {
        ignore: [
            '.*',
            '_*'
        ],
        // By default, we only copy modified files during
        // a watch or webpack-dev-server build. Setting this
        // to `true` copies all files.
        copyUnmodified: true
    }),
    new CleanWebpackPlugin([distPath], {
        root: rootPath, //  Useful when relative references are used in array
        verbose: true,
        dry: false,
        //  exclude: ['shared.js']
    })
    // new webpack.optimize.DedupePlugin(), // https://github.com/webpack/webpack/issues/1082
]);

config.stats = {
    modules: false,
    colors: true,
    hash: true
};
// config.module.rules = config.module.rules.concat([{
//     test: /\.(sass|scss)/,
//     loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}!sass-loader'
// }]);

module.exports = config;
