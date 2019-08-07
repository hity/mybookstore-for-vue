let utils = require('./utils')
let config = require('../config')
let isProduction = process.env.NODE_ENV === 'production'

let loaders = utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction ? config.build.extractCss : config.dev.extractCss
});
loaders.js = 'happypack/loader?id=js'
module.exports = {
    loaders: loaders,
    postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6'] })]
}
