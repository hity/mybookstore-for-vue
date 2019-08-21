// route.js
/**
 * @author:      hity
 * @dateTime:    2019-08-06
 * @description: 藏书路由
 */

const List = () => import(/* webpackChunkName: 'list' */ 'module/list/index');

const Detail = () => import(/* webpackChunkName: 'detail' */ 'module/list/detail');
const Add = () => import(/* webpackChunkName: 'add' */ 'module/list/add');

export default [{
    path: '/store/list',
    component: List,
    name: 'store.list',
}, {
    path: '/store/detail/:bookId',
    component: Detail,
    name: 'store.detail',
}, {
    path: '/store/add/:bookId',
    component: Add,
    name: 'store.add',
}];
