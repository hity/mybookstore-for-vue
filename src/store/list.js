// store.js
/**
 * @author:      hity
 * @dateTime:    2019-08-21
 * @description: 书本管理
 */
import {requestPosList, requestTagList} from '@/request/list';

const state = {
    posList: [],
    tagList: [],
};

// getters
const getters = {
};

// actions
const actions = {
    getPosList({commit}) {
        requestPosList(null).then(({items, total}) => {
            commit('changeState', {key: 'posList', value: items});
        });
    },
    getTagList({commit}) {
        requestTagList(null).then(({items, total}) => {
            commit('changeState', {key: 'tagList', value: items});
        });
    }
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
