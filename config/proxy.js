var RAP_SERVICE = 'http://192.168.4.102:9999/mockjsdata/'
module.exports = {
    proxyAllUrl: 'http://hity.test.com:3000/', // 如果不为空，那么所有的请求都将代理到这个url
    // RAP服务接口
    proxyTable: {
        '/api/book': RAP_SERVICE + '170',
        '/api/tag': RAP_SERVICE + '170',
        '/api/pos': RAP_SERVICE + '170',
        '/api/category': RAP_SERVICE + '170',
        '/common/provinces': 'https://m-testper.aiyoumi.com:10454',
        '/common/citys': 'https://m-testper.aiyoumi.com:10454',
        '/common/districts': 'https://m-testper.aiyoumi.com:10454',
        '/common/streets': 'https://m-testper.aiyoumi.com:10454'
    },
    // 本地json数据接口, 如果需要根据url的参数区分不同的接口数据，那么url中带？，并且指定具体的接口
    proxyLocal: {
        '/post/saveItem': '/proxy/post?json=/data/download.json&'
    }
};