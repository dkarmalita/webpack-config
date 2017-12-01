const path = require('path')

const rootPath = process.cwd()
const pkg = require(path.join(rootPath, 'package.json'))

let appMain = path.join(rootPath, 'src/app.js') // Main application's file
let distPath = path.join(rootPath, 'dist') // Target path for distribution to generate
let htmlTempl = path.join(rootPath, 'src/index.ejs') // Template to generate the "index.html"
let port = 3000
let srcPath = path.join(rootPath, 'src') // Sources files
let statPath = path.join(rootPath, 'static') // Static files ro include in distribution

if(pkg.webpack !== undefined) {
    appMain = path.join(rootPath, pkg.webpack.main || appMain) // Main application's file
    distPath = path.join(rootPath, pkg.webpack.build || distPath) // Target path for distribution to generate
    htmlTempl = path.join(rootPath, pkg.webpack.html || htmlTempl) // Template to generate the "index.html"
    port = pkg.webpack.devport || port
    srcPath = path.join(rootPath, pkg.webpack.source || srcPath) // Sources files
    statPath = path.join(rootPath, pkg.webpack.static || statPath) // Static files ro include in distribution
}

module.exports = {
    appMain,
    distPath,
    htmlTempl,
    srcPath,
    statPath,
    port,
}
