process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var start = new Date()

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsDllRoot, 'manifest.json'), err => {})

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
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
})
