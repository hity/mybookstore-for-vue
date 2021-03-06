let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let entries = Object.assign({}, baseWebpackConfig.entry)

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
})

let conf = merge(baseWebpackConfig, {
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
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: 'index.html',
                // favicon: 'favicon.ico',
                inject: true
            }),
        // copy custom static assets
        // new CopyWebpackPlugin([
        //   {
        //     from: './static',
        //     to: './static',
        //     ignore: ['.*']
        //   }
        // ])
    ]
})

module.exports = conf
