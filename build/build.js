// 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell
require('shelljs/global')
process.env.NODE_ENV = 'production'
var path = require('path')
var config = require('../config')
// 一个很好看的 loading 插件
var ora = require('ora')
var chalk = require('chalk')
// var rm = require('rimraf')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var start = new Date()
// 使用 ora 打印出 loading + log
var spinner = ora('building for production...')
// 开始 loading 动画
spinner.start()

// 删除这个文件夹 （递归删除）
rm('-rf', config.build.assetsRoot)
// 创建此文件夹
mkdir('-p', config.build.assetsRoot)
// 复制 static 文件夹到我们的编译输出目录
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    var end = new Date()

    console.log(chalk.cyan('  Build complete.\n'))
    console.log('executing time ', end - start)
})