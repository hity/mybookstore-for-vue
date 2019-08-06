var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var os = require('os')
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: (config.build.productionSourceMap ? '#source-map' : false),
    output: {
        publicPath: config.build.assetsPublicPath,
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new ParallelUglifyPlugin({
            cacheDir: path.join(__dirname, '../.cache'), // Optional absolute path to use as a cache. If not provided, caching will not be used.
            workerCount: 3, // os.cpus().length, // Optional int. Number of workers to run uglify. Defaults to num of cpus - 1 or asset count (whichever is smaller)
            uglifyJS: {
                compress: {
                    warnings: false,
                    // drop_console: true
                    drop_console: true
                },
                sourceMap: false
            }
        }),

        // extract css into its own file [contenthash].
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin(),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            minChunks: 3
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory + './static',
            ignore: ['.*']
        }]),
        new ManifestRevisionPlugin(path.join(config.build.assetsDllRoot, 'manifest.json'), {
            rootAssetPath: config.build.assetsRoot,
            ignorePaths: ['/stylesheets', '/javascript']
        })
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
if (config.build.visualizer) {
    var Visualizer = require('webpack-visualizer-plugin')
    webpackConfig.plugins.push(new Visualizer({
        filename: path.resolve(__dirname, '../dist/statistics.html')
    }))
}

module.exports = webpackConfig