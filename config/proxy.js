var RAP_SERVICE = 'http://192.168.4.102:9999/mockjsdata/'
module.exports = {
    proxyAllUrl: '', //https://m.aixuedai.com ，如果不为空，那么所有的请求都将代理到这个url
    // RAP服务接口
    proxyTable: {
        '/statistics/pv': RAP_SERVICE + '170',
        '/doLogin': RAP_SERVICE + '176',
        '/rent/house/getHouseRentList': RAP_SERVICE + '176',
        '/uploadContract': RAP_SERVICE + '176',
        '/upload/save': 'http://192.168.4.12:7000',
        '/rent/house/getHouseRentDetail': RAP_SERVICE + '176',
        '/rent/house/confirmRerent': RAP_SERVICE + '176'
    },
    // 本地json数据接口, 如果需要根据url的参数区分不同的接口数据，那么url中带？，并且指定具体的接口
    proxyLocal: {
        '/post/saveItem': '/proxy/post?json=/data/download.json&'
    }
};