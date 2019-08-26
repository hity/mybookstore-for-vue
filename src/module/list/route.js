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
    meta: {
        fMenu: 'store'
    }
}, {
    path: '/store/detail/:bookId',
    component: Detail,
    name: 'store.detail',
    meta: {
        fMenu: 'store'
    }
}, {
    path: '/store/edit/:bookId',
    component: Add,
    name: 'store.edit',
    meta: {
        fMenu: 'store'
    }
}];
