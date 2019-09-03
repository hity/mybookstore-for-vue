/**
 * @author:      hity
 * @dateTime:    2019-08-22
 * @description: module路由
 */
import listRoute from 'module/list/route';
import inputRoute from 'module/input/route';
import planRoute from 'module/plan/route';

export default [
    ...listRoute,
    ...inputRoute,
    ...planRoute,
];
