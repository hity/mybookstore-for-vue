var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

var entries = Object.assign({}, baseWebpackConfig.entry)

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
})

var conf = merge(baseWebpackConfig, {
    output: {
        publicPath: config.dev.assetsPublicPath,
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new FriendlyErrorsPlugin(),

        // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          // favicon: 'favicon.ico',
          inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: './static',
            to: './static',
            ignore: ['.*']
          }
        ])
    ]
})

module.exports = conf
