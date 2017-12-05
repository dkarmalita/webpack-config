// TODO: add extract-text-webpack-plugin to SASS/SCSS logic
// ref: https://github.com/webpack-contrib/extract-text-webpack-plugin
// TODO: in 'no config' case, wp has to look into the current directory for index.js|app.js index.ejs|index.html
// TODO: in 'no config' case, config via command line keys
// TODO: in 'no config' case, no build & message about "no destination set"
const path = require('path')

const rootPath = process.cwd()
const pkg = require(path.join(rootPath, 'package.json'))

const port = (pkg.webpack && pkg.webpack.devport) ? pkg.webpack.devport : 3000

// Main application's file
const appMain = (pkg.webpack && pkg.webpack.main)
? path.join(rootPath, pkg.webpack.main)
: path.join(rootPath, 'src/app')

// Target path for distribution to generate
const distPath = (pkg.webpack && pkg.webpack.build)
? path.join(rootPath, pkg.webpack.build)
: path.join(rootPath, 'dist')

// Template to generate the "index.html"
const htmlTempl = (pkg.webpack && pkg.webpack.html)
? path.join(rootPath, pkg.webpack.html)
: path.join(rootPath, 'src/index.ejs')

// Sources files
const srcPath = (pkg.webpack && pkg.webpack.source)
? path.join(rootPath, pkg.webpack.source)
: path.join(rootPath, 'src')

// Static files ro include in distribution
const statPath = (pkg.webpack && pkg.webpack.static)
? path.join(rootPath, pkg.webpack.static)
: path.join(rootPath, 'static')

// console.log(appMain),
// console.log(distPath),
// console.log(htmlTempl)
// console.log(srcPath),
// console.log(statPath),
// console.log(port)

// Load alias object from package.json
const alias = {}
if (pkg.webpack && pkg.webpack.alias) {
    Object.keys(pkg.webpack.alias).forEach((key)=>{
        alias[key] = path.join(rootPath, pkg.webpack.alias[key]) // Static files ro include in distribution
        console.log(key, alias[key])
    })
}

module.exports = {
    alias,
    appMain,
    distPath,
    htmlTempl,
    port,
    srcPath,
    statPath,
}
