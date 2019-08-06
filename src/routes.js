/**
 * @author:      hity
 * @dateTime:    2018-09-26
 * @description: 总路由文件
 */
import moduleRouter from 'module/route';
import rootPage from 'module/app.vue';
import errorPage from 'module/error';
import moduleIndex from 'module/index';

let otherRouter = [{
    path: '/',
    component: rootPage,
    name: 'index',
    children: [{
        path: 'index',
        component: moduleIndex,
        children: moduleRouter
    }]
}, {
    path: '*',
    name: 'notfound',
    meta: {
        title: '404-页面不存在'
    },
    component: errorPage
}];

let result = [
    // ...moduleRouter,
    ...otherRouter
];
export default result;
