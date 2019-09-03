// route.js
/**
 * @author:      hity
 * @dateTime:    2019-08-06
 * @description: 计划路由
 */

const Index = () => import(/* webpackChunkName: 'plan' */ 'module/plan/index');

export default [{
    path: '/plan/index',
    component: Index,
    name: 'plan.index',
    meta: {
        fMenu: 'plan'
    }
}];
