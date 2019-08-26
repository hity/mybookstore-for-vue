// route.js
/**
 * @author:      hity
 * @dateTime:    2019-08-06
 * @description: 录入路由
 */

const Index = () => import(/* webpackChunkName: 'input' */ 'module/input/index');
const Add = () => import(/* webpackChunkName: 'add' */ 'module/list/add');

export default [{
    path: '/input/index',
    component: Index,
    name: 'input.index',
    meta: {
        fMenu: 'input'
    }
}, {
    path: '/input/add',
    component: Add,
    name: 'input.add',
    meta: {
        fMenu: 'input'
    }
}];
