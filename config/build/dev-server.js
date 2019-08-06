/*
    created by hity on 26/09/2018
*/
var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var ip = require('ip').address()
var fs = require('fs')
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var gitCheck = !!config.dev.gitCheck

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
var uri = 'http://' + ip + ':' + port

// app.set('views', './build/views')
// app.set('view engine', 'ejs')

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

// rap proxy api requests
Object.keys(proxyTable.proxyTable).forEach(function(context) {
    var options = proxyTable.proxyTable[context]

    if (typeof options === 'string') {

        options = {
            target: options,
            changeOrigin: true
        }
        if (context.indexOf('?') > 0) {
            options.filter = function(pathname, req) {
                return (req.url === context && req.query);
            }
        }
    }

    if (proxyTable.proxyAllUrl && proxyTable.proxyAllUrl !== '') {
        options.target = proxyTable.proxyAllUrl
    }

    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
app.use('/mock', express.static(path.join(__dirname, '../mock')))

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    // TODO: gitcheck
    // if (gitCheck) {
    //     var gitinstall = require('../bin/install-hooks.js')
    //     gitinstall.check()
    // }

    opn(uri)
})