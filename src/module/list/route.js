// route.js
/**
 * @author:      hity
 * @dateTime:    2019-08-06
 * @description: 藏书路由
 */

const List = () => import(/* webpackChunkName: 'assets' */ 'module/list/index');

const Detail = () => import(/* webpackChunkName: 'labelList' */ 'module/list/detail');

export default [{
    path: '/store',
    name: 'store',
    component: List,
    redirect: { name: 'store.list' },
    children: [{
        path: 'list',
        component: List,
        name: 'store.list',
    }, {
        path: 'detail/:bookId',
        component: Detail,
        name: 'store.detail',
    }]
}];
