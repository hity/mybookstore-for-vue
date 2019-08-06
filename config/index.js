// see http://vuejs-templates.github.io/webpack for documentation.
let path = require('path')
let proxyConfig = require('./proxy');

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../public/index.html'),
        assetsRoot: path.resolve(__dirname, '../public/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        cssSourceMap: false,
        extractCss: true
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8000,
        sslPort: 8001,
        assetsRoot: path.resolve(__dirname, '../public/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: proxyConfig,
        // extractCss: false,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        extractCss: false
    }
    // historyArr: historyArr
}
