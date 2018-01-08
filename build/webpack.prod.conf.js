var path = require('path')
var config = require('../config')
var utils = require('./utils') 
var webpack = require('webpack') 
var merge = require('webpack-merge') 
var baseWebpackConfig = require('./webpack.base.conf') 
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin')

// 一个 webpack 扩展，可以提取一些代码并且将它们和文件分离开
// 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 一个可以插入 html 并且创建新的 .html 文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env

// 合并 webpack.base.conf.js
var webpackConfig = merge(baseWebpackConfig, {
    // module: {
    //     // 使用的 loader
    //     rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
    // },
    // 是否使用 #source-map 开发工具，更多信息可以查看 DDFE 往期文章
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        // 编译输出目录
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        // 编译输出文件名
        // 我们可以在 hash 后加 :6 决定使用几位 hash 值
        filename: utils.assetsPath('js/[name].[chunkhash].js'), 
        // 没有指定输出名的文件输出的文件名
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    plugins: [
        // 使用的插件
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 压缩 js (同样可以压缩 css)
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // extract css into its own file
        // 将 css 文件分离出来
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        // 输入输出的 .html 文件
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            // 是否注入 html
            inject: true, 
            // // 压缩的方式
            minify: { 
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // 没有指定输出文件名的文件输出的静态文件名
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            minChunks: 3
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new ManifestRevisionPlugin(path.join(config.build.assetsRoot, 'manifest.json'), {
            rootAssetPath: config.build.assetsRoot,
            ignorePaths: ['/stylesheets', '/javascript']
        })
    ]
})

// 开启 gzip 的情况下使用下方的配置
if (config.build.productionGzip) {
    // 加载 compression-webpack-plugin 插件
    var CompressionWebpackPlugin =  require('compression-webpack-plugin')
    // 向webpackconfig.plugins中加入下方的插件
    var reProductionGzipExtensions = '\\.(' + config.build.productionGzipExtensions.join('|') + '$)'
    webpackConfig.plugins.push(
        // 使用 compression-webpack-plugin 插件进行压缩
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(reProductionGzipExtensions), // 注：此处因有代码格式化的bug，与源码有差异
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig