/* eslint no-console: 0, 'no-useless-escape': 'off' */

const babelConfig = require('../babel')

// Import required node packages
// -----------------------------
const path = require('path')

// Import required webpack packages
// --------------------------------
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssEasyImport = require('postcss-easy-import')

// Get root path of the project
// ----------------------------
const rootPath = process.cwd()

// Import project's `package.json`
// -------------------------------
// const pkg = require(path.join(rootPath, 'package.json'))

const {
    appMain,
    distPath,
    htmlTempl,
    srcPath,
    statPath,
    port,
} = require('./defaults.js')

// Get name of the npm's script executed
// -------------------------------------
// It takes NPM original script name in variable.
// Returns `undefined` while 'webpack' is run directly.
const npmScript = process.env.npm_lifecycle_event

console.log('=> Running NPM script: \'' + npmScript + '\'')

const loader = (name) => require.resolve(name)

const pubPath = '/' // Path of the application on a domen

// Prepare PostCSS loaders
// -----------------------
const isDevelopment = () => process.env.NODE_ENV === 'development'

const scssLoaders = (modules=false) => [
    {
        loader: loader('style-loader'),
        options: {
            sourceMap: isDevelopment(),
        },
    },
    {
        loader: loader('css-loader'),
        options: {
            importLoaders: 1,
            // url: false,
            modules: modules,
            localIdentName: '[name]_[local]_[hash:base64:5]',
        },
    },
    {
        loader: loader('postcss-loader'),
        options: {
            sourceMap: isDevelopment(),
            plugins: () => [
                autoprefixer,
                cssEasyImport
            ],
        },
    },
    {
        loader: loader('sass-loader'),
        options: {
            sourceMap: isDevelopment(),
        },
    },
]

// Prepare common part of Webpack configuration
// --------------------------------------------
const config = {
    entry: [
        appMain,
    ],
    output: {
        filename: '[name].js', // Output bundle naming rule
        path: distPath, // Output path for the bundles
        publicPath: pubPath, //
        chunkFilename: 'async.[id].js',
    },
    module: {

        noParse: [
            // Don’t parse files matching a RegExp or an array of RegExps.
            // It’s matched against the full resolved request.
            // This can boost the performance when ignoring big libraries.

            // The files are expected to have no call to require, define, or similar.
            // They are allowed to use exports and module.exports.

            // 'noParse' key allows us use "ready to go" parts (like
            // pre-minified libraries and etc.). These parts are including
            // in bundle without preprocessing.
            // http://stackoverflow.com/a/35018271

            /\min.(js|css)$/,
            // leave out all of min.js and min.css files.
        ],

        rules: [
            // {
            //     test: /\.(js|jsx)/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     options: {
            //         fix: true,
            //     },
            //     exclude: [/(node_modules|public|demo)/]
            // },

            // ## scss & css files support
            // ---------------------------------
            // We will support two masks here:
            // `*.scss` for global styles
            // `*.module.scss` for module styles
            // ---------------------------------
            {
                test: /\.module\.(css|scss)$/,
                use: scssLoaders(true), // FIXME

            },
            {
                test: /\.(css|scss)$/,
                exclude: /\.module\.(css|scss)$/,
                use: scssLoaders(),
            },

            // ## images
            // ---------
            {
                test: /\.gif$/,
                use: 'url-loader?limit=16000&mimetype=image/gif&name=[name].[ext]?[hash]',
            },
            {
                test: /\.jpg$/,
                use: 'url-loader?limit=100000&mimetype=image/jpg&name=[name].[ext]?[hash]',
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192',
            },
            {
                test: /.(svg?)(\?[a-z0-9]+)?$/,
                loader: loader('url-loader'),
                query: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'assets/',
                },
            },

            // ## html/md
            {
                test: /\.html/,
                use: [
                    loader('html-loader')
                ],
            },
            {
                test: /\.md/,
                use: [
                    loader('html-loader'),
                    loader('markdown-loader')
                ],
            },

            // ## fonts
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: loader('url-loader'),
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'assets/',
                },
            },
            {
                test: /\.(eot|ttf|otf)(\?.*)?$/,
                loader: loader('url-loader'),
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'assets/',
                },
            },

            // ## js/jsx
            {
                test: /\.(js|jsx)/,
                use: {
                    loader: loader('babel-loader'),
                    options: babelConfig,
                },
                // use: [
                //     'babel-loader', //
                // {
                //     loader: 'eslint-loader',
                //     options: {
                //         fix: true,
                //         // cache: true,
                //         // formatter: require("eslint-friendly-formatter")
                //     }
                // }
                //     ],
                exclude: /(node_modules|public)/,
            },
            {
                test: /\.json/,
                use: 'json-loader',
                exclude: /(node_modules|public)/,
            },
        ],
    },
    resolve: {
        extensions: [ '.jsx', '.js' ],
        modules: ['node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // target name
            favid: Date.now(), // it is reffered in template and forced favicon get updated
            template: htmlTempl,
            publicPath: pubPath,
            inject: 'body',
            minify: false, // ref: https://github.com/kangax/html-minifier#options-quick-reference
        }),
        new webpack.ProvidePlugin({ // ref: http://stackoverflow.com/a/42735205
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether',
            tether: 'tether',
            Tether: 'tether',
        }),
        /*
                new webpack.optimize.CommonsChunkPlugin({
                  name      : 'vendor',
                  minChunks : (module, count) => {
                    return module.resource && module.resource.indexOf(srcPath) === -1;
                  }
                }),
        // [ ] Chunk sorter research
        // =====================
                // Place all of the sources outside 'src' into the 'vendor' bundle.
                new webpack.optimize.CommonsChunkPlugin({
                  name      : 'vendor',
                  minChunks : (module, count) => {
                    console.log('CommonsChunkPlugin =>',count, module.rawRequest)
                    module.resource
                    && module.resource.indexOf(srcPath) != -1
                    && module.resource.indexOf('routes') != -1 &&
                    console.log("\nB => ", module.rawRequest, module.chunks[0].name ,module.resource);

                    return false // module.resource
                      // && module.resource.indexOf(srcPath) === -1
                      //&& module.resource.indexOf('react-dom') != -1 ;
                  }
                }),
        */
    ],
    performance: {
        hints: false,
    },
}

module.exports = {
    appMain, // Main application's file
    config,
    distPath, // Target path for distribution to generate
    htmlTempl, // Template to generate the "index.html"
    port,
    pubPath, // Path of the application on a domen
    rootPath, // Root of the project
    srcPath, // Sources files
    statPath, // Static files ro include in distribution
}
