// store.js
/**
 * @author:      hity
 * @dateTime:    2018-09-26
 * @description: 总vuex store文件
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    namespaced: true,
    // strict: debug,
    state: {},
    getters: {},
    mutations: {},
    modules: {
        user,
    }
});
