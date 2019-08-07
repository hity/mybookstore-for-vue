const MOCK_SERVICE = 'https://nei.netease.com/api/apimock/c05110c6f36f27fae2a3768cac354a1c'
module.exports = {
    proxyAllUrl: '', // 如果不为空，那么所有的请求都将代理到这个url
    // RAP服务接口
    proxyTable: {
        '/api/book/list': MOCK_SERVICE,
        '/api/book': MOCK_SERVICE,
    },
    // 本地json数据接口, 如果需要根据url的参数区分不同的接口数据，那么url中带？，并且指定具体的接口
    proxyLocal: {
        // '/post/saveItem': '/proxy/post?json=/data/download.json&'
    }
}
