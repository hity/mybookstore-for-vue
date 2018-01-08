var config = require('../config') 
var webpack = require('webpack') 
// 使用 webpack 配置合并插件
var merge = require('webpack-merge') 
// 使用一些小工具
var utils = require('./utils') 
var baseWebpackConfig = require('./webpack.base.conf') 

// 使用 html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
var HtmlWebpackPlugin = require('html-webpack-plugin') 
// add hot-reload related code to entry chunks
// 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true'].concat(baseWebpackConfig.entry[name])
})
// 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并
module.exports = merge(baseWebpackConfig, {
    output: {
        path: config.dev.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        // 编译输出的文件名
        filename: '[name].js',
        // 没有指定输出名的文件输出的文件名
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js') 
    },
    // eval-source-map is faster for development
    // 使用 #eval-source-map 模式作为开发工具，此配置可参考 DDFE 往期文章详细了解
    devtool: '#cheap-module-eval-source-map',
    plugins: [

    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // 为组件和模块分配ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    // HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),

    // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: true
    })
  ]
})