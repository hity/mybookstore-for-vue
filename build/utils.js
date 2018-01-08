var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.resolvePath = function(_path) {
    return path.join(__dirname, _path)
}

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.getEntry = function(globPath) {
    var entries = {},
        basename, tmp, pathname
    
    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry))

        tmp = entry.split('/').splice(2)
        tmp = tmp.slice(0, -1)
        pathname = tmp.join('/') + '/' + basename // 正确输出js和html的路径
        entries[pathname] = entry
    })
    return entries
}