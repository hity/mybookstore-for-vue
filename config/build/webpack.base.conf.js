var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: 4
});

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function happyPack(type, loader) {
    return new HappyPack({
        id: type,
        cache: false,
        debug: false,
        threadPool: happyThreadPool,
        loaders: [loader]
    })
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        // TODO: 通过npm的方式引入echarts2
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jsplumb$': 'jsplumb/dist/js/jsplumb.js',
            '@': resolve('src'),
            'resorces': resolve('src/resorces'),
            'components': resolve('src/components'),
            'module': resolve('src/module'),
            'libs': resolve('src/libs'),
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src')],
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'happypack/loader?id=js',
            include: [resolve('src'), resolve('/node_modules/iview/src'), ]
        }, {
            test: /\.(png|jpe?g|gif|svg|bmp)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'res/media/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: [
        happyPack('js', 'babel-loader'),
        happyPack('eslint', 'eslint-loader'),
        happyPack('css', 'css-loader'),
        happyPack('sass', 'sass-loader')
    ]
}