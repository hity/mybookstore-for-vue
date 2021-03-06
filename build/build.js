process.env.NODE_ENV = 'production'

let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let webpackConfig = require('./webpack.prod.conf')

let start = new Date()

let spinner = ora('building for production...')
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

        let end = new Date()

        console.log(chalk.cyan('  Build complete.\n'))
        console.log('executing time ', end - start)
    })
})
