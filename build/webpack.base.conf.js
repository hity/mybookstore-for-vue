var webpack = require('webpack')
var path = require('path') 
var config = require('../config') 
var utils = require('./utils') 
var autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 将 NodeJS 环境作为我们的编译环境
var env = process.env.NODE_ENV

// 获得入口js文件
module.exports = {
    entry: {main: './src/main.jsx'},
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'src': utils.resolvePath('../src')
        }
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [utils.resolvePath('../src')]
        }, {
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            include: [utils.resolvePath('../src')],
            options:{
                presets: ['env']                
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
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
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }]
    }
}

