/**
 * @author:      hity
 * @dateTime:    2018-09-26
 * @description: 入口js文件
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import configRouter from '@/routes';
import store from '@/store';
import ElementUi from 'element-ui';
import Pagination from '@/components/pagination';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/fontawesome-all.css';
import '@/assets/styles/iconfont.css';

Vue.use(ElementUi);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: configRouter,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'my book store';
    next();
});

// Vue.config.debug = true
Vue.config.devtools = process.env.NODE_ENV !== 'production';
Vue.component('store-pagination', Pagination);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
