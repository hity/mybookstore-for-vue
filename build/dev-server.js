// 获取 config/index.js 的默认配置
var config = require('../config')

// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

// 使用 NodeJS 自带的文件路径工具
var path = require('path')

// 使用 express
var express = require('express')

// 使用 webpack
var webpack = require('webpack')

// 一个可以强制打开浏览器并跳转到指定 url 的插件
var opn = require('opn')

var ip = require('ip').address()

// 使用 proxyTable
var proxyMiddleware = require('http-proxy-middleware')

// 使用 dev 环境的 webpack 配置
var webpackConfig = require('./webpack.dev.conf')
// default port where dev server listens for incoming traffic

var fs = require('fs');
var http = require('http');
// var https = require('https');
var privateKey  = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// var sslPort = process.env.PORT || config.dev.sslPort
// var sslUri = 'https://' + ip + ':' + sslPort

// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
var port = process.env.PORT || config.dev.port
var uri = 'http://' + ip + ':' + port

// var port = sslPort
// var uri = sslUri
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware

// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
var proxyTable = config.dev.proxyTable

// 使用 express 启动一个服务
var server = express()

// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)

// 定义将编译后的代码，存入内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上，热替换
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

// 代理
// local proxy api requests, local priority is higher than rap
var proxyTable = config.dev.proxyTable
Object.keys(proxyTable.proxyLocal).forEach(function(context) {
    var options = proxyTable.proxyLocal[context]

    if (typeof options === 'string') {
        options = {
            target: uri + options
        }
        if (context.indexOf('?') > 0) {
            options.filter = function(pathname, req) {
                return (req.url === context && req.query);
            }
        }
    } else if (options.target && !options.target.match(uri)) {
        options.target = uri + options.target
    }

    if (proxyTable.proxyAllUrl && proxyTable.proxyAllUrl !== '') {
        options.target = proxyTable.proxyAllUrl
    }
    server.use(proxyMiddleware(options.filter || context, options))
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

    server.use(proxyMiddleware(options.filter || context, options))
})


// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
server.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
server.use(devMiddleware)


// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware)


// serve pure static assets
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供响应服务
server.use(staticPath, express.static('./static'))

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
})

// var httpServer = http.createServer(credentials, server);

// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = server.listen('8000', function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
    opn(uri)
})