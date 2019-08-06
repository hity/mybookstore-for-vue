// store.js
/**
 * @author:      hity
 * @dateTime:    2018-09-26
 * @description: 业务数据管理
 */

const state = {
    isLogin: false,
    name: '',
    email: '',
};

// getters
const getters = {
};

// actions
const actions = {};

// mutations
const mutations = {
    changeUserInfo(state, {isLogin, name, email}) {
        state = Object.assign(state, {
            isLogin,
            name,
            email
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
