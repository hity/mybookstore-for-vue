// store.js
/**
 * @author:      hity
 * @dateTime:    2019-08-21
 * @description: 书本录入
 */
import {searchBook, searchOnlineBookDetail} from '@/request/input';

const state = {
    storeBooks: [], // 根据录入条件查询到的藏书馆的书本
    onlineBooks: [], // 根据录入条件查询到的网络上的书本
    onlineDetail: {}, // 获取网络上的书本详情
};

// getters
const getters = {
};

// actions
const actions = {
    getInputBooks({commit}, {
        searchValue,
        success,
        fail,
    }) {
        searchBook({searchValue}).then(({storeBooks, onlineBooks, total}) => {
            commit('changeState', {key: 'storeBooks', value: storeBooks});
            commit('changeState', {key: 'onlineBooks', value: onlineBooks});
            success && success(total);
        }, () => {
            fail && fail();
        });
    },
    getInputBookDetail({commit}, {
        href,
        success,
        fail,
    }) {
        searchOnlineBookDetail({href}).then((detail) => {
            commit('changeState', {key: 'onlineDetail', value: detail});
            success && success();
        }, () => {
            fail && fail();
        });
    },
};

// mutations
const mutations = {
    changeState(state, {key, value}) {
        state[key] = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
