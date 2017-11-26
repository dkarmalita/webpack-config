/* eslint no-console: 0 */

// Set environment variable to use by React & Babel
// ------------------------------------------------
// refs:  https://babeljs.io/docs/usage/babelrc/#env-option
//        http://stackoverflow.com/a/36285479
process.env.NODE_ENV = 'development'

// Execute common initialization and import vars
// ---------------------------------------------
const {
    config, // common part of config
    statPath, // path to static content (resolved)
    pkg,
} = require('./common')

// Import required webpack packages
// --------------------------------
const webpack = require('webpack')

// Set development - specific config path
// --------------------------------------
config.entry = [
    // 'react-hot-loader/patch',       // ! this string has to be the first
    'webpack-dev-server/client?http://localhost:' + pkg.webpack.devport,
    'webpack/hot/only-dev-server',
].concat(config.entry)

config.devtool = 'cheap-module-eval-source-map'

config.devServer = {
    inline: true,
    hot: false,
    host: '0.0.0.0',
    port: pkg.webpack.devport, // 3033,
    contentBase: statPath,
    // historyApiFallback: true,

    // Enable fallback to specific point for spacific links
    historyApiFallback: {
        // index: '/'  // redirect any nonexisting path to the root
        rewrites: [
            // redirect all of the absent .html pages to basic root '/'
            // https://github.com/webpack/docs/wiki/webpack-dev-server#the-historyapifallback-option
            // { from: /\.html/, to: '/' },
            { from: /./, to: '/' },
        ],
    },

    stats: {
        // ref: https://webpack.js.org/configuration/stats/

        // options for formatting the statistics
        colors: true,
        // Add asset Information
        assets: false,
        // Sort assets by a field
        // assetsSort: "field",
        // Add information about cached (not built) modules
        cached: false,
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: true,
        // Add built modules information to chunk information
        chunkModules: false,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Sort the chunks by a field
        // chunksSort: "field",
        // Context directory for request shortening
        // context: "../src/",
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: true,
        // Add the hash of the compilation
        hash: false,
        // Add built modules information
        modules: false,
        // Sort the modules by a field
        // modulesSort: "field",
        // Add public path information
        publicPath: false,
        // Add information about the reasons why modules are included
        reasons: false,
        // Add the source code of modules
        source: false,
        // Add timing information
        timings: false,
        // Add webpack version information
        version: false,
        // Add warnings
        warnings: true,
    },
}

config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    //    new WebpackNotifierPlugin(),
])

config.output.pathinfo = true

config.module.rules = config.module.rules.concat([
    // {
    //     test: /\.(sass|scss)/,
    //     loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}!sass-loader?sourceMap'
    // },
])

module.exports = config
